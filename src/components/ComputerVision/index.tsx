import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";

function ComputerVision() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);

  // Setup do vídeo
  const setupCamera = async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 480 },
          height: { ideal: 360 },
          frameRate: { ideal: 30 },
        },
      });
      videoRef.current.srcObject = stream;

      return new Promise<HTMLVideoElement>((resolve) => {
        videoRef.current!.onloadedmetadata = () => resolve(videoRef.current!);
      });
    }
    throw new Error("Video element is not available.");
  };

  // Inicialização do TensorFlow.js e do detector de pose
  const init = async () => {
    await tf.setBackend("webgl");
    await tf.ready();
    console.log("Backend atual:", tf.getBackend());

    await setupCamera();
    if (videoRef.current) {
      await videoRef.current.play();

      if (canvasRef.current && videoRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
    }

    // Verificando se já existe um detector
    if (!detectorRef.current) {
      detectorRef.current = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
          runtime: "mediapipe",
          modelType: "lite",
          solutionPath: "/pose_assets/",
        }
      );
    }
  };

  // Função para detectar a pose
  async function detectPose() {
    const detector = detectorRef.current; // Usando o detector armazenado em useRef
    if (detector && videoRef.current) {
      const poses = await detector.estimatePoses(videoRef.current);
      console.log("Detectado:", poses);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          ); // Limpa o canvas

          if (poses.length > 0) {
            //Não captura o rosto
            const keypoints = poses[0].keypoints.filter((element, index) => {
              return index > 10;
            });

            // Desenhar os keypoints
            drawKeypoints(keypoints, ctx);
            // Desenhar o esqueleto (linhas conectando os keypoints)
            drawSkeleton(keypoints, ctx);
          }
        }
      }

      requestAnimationFrame(detectPose);
    }
  }

  function drawSkeleton(
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D
  ) {
    // Definir as conexões entre os keypoints
    const skeletonConnections: Array<[string, string]> = [
      // tronco
      ["right_shoulder", "left_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_shoulder", "right_elbow"],
      ["right_elbow", "right_wrist"],
      ["left_shoulder", "left_hip"],
      ["right_shoulder", "right_hip"],
      ["left_hip", "right_hip"],

      // pernas
      ["left_hip", "left_knee"],
      ["left_knee", "left_ankle"],
      ["right_hip", "right_knee"],
      ["right_knee", "right_ankle"],

      // pés (BlazePose tem os dedos principais)
      ["left_ankle", "left_heel"],
      ["right_ankle", "right_heel"],
      ["left_ankle", "left_foot_index"],
      ["right_ankle", "right_foot_index"],
    ];

    // Desenhar as linhas conectando os keypoints
    skeletonConnections.forEach(([startName, endName]) => {
      const startPoint = keypoints.find((kp) => kp.name === startName);
      const endPoint = keypoints.find((kp) => kp.name === endName);

      if (
        startPoint &&
        (startPoint.score ?? 0) > 0.5 &&
        endPoint &&
        (endPoint.score ?? 0) > 0.5
      ) {
        // Verifique se a confiança é suficiente
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "lime";
        ctx.stroke();
      }
    });
  }

  // Função para desenhar os keypoints na tela
  const drawKeypoints = (
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D
  ) => {
    keypoints.forEach((kp) => {
      if (kp.score != null && kp.score > 0.75) {
        const x = kp.x;
        const y = kp.y;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "lime";
        ctx.fill();
      }
    });
  };

  useEffect(() => {
    init().then(() => {
      requestAnimationFrame(detectPose);
    });

    // Limpar o detector quando o componente for desmontado
    return () => {
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  });

  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
    </div>
  );
}

export default ComputerVision;
