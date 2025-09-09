import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";
import { ExerciseInfo } from "../../utils/ExerciseInfo";

type ComputerVisionProps = {
  exerciseInfo: ExerciseInfo;
};

function ComputerVision({ exerciseInfo }: ComputerVisionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);

  const setupCamera = async () => {
    if (!videoRef.current) throw new Error("Video element is not available.");

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
  };

  // TensorFlow.js & BlazePose initialization
  const init = async () => {
    await tf.setBackend("webgl");
    await tf.ready();
    console.log("Backend atual:", tf.getBackend());

    await setupCamera();
    if (videoRef.current) await videoRef.current.play();

    if (canvasRef.current && videoRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
    }

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

  const detectPose = async () => {
    const detector = detectorRef.current;
    if (!detector || !videoRef.current) return;

    const poses = await detector.estimatePoses(videoRef.current);
    console.log("Detectado:", poses);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (poses.length > 0) {
          //Não captura o rosto
          const keypoints = poses[0].keypoints.filter((element, index) => {
            return index > 10;
          });

          drawSkeleton(keypoints, ctx, exerciseInfo.skeleton);
        }
      }
    }

    requestAnimationFrame(detectPose);
  };

  const drawSkeleton = (
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D,
    skeleton: Array<[string, string]>
  ) => {
    // Cria um Set com todos os keypoints usados no skeleton
    const keypointNames = new Set<string>();
    skeleton.forEach(([start, end]) => {
      keypointNames.add(start);
      keypointNames.add(end);
    });

    ctx.save();

    const lineWidth = 2;
    const lineColor = "lime";
    const pointRadius = 4;
    const pointColor = "red";

    // desenha linhas
    skeleton.forEach(([startName, endName]) => {
      const start = keypoints.find((kp) => kp.name === startName);
      const end = keypoints.find((kp) => kp.name === endName);

      if (!start || !end) return;
      if ((start.score ?? 0) < 0.5 || (end.score ?? 0) < 0.5) return;

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    });

    // desenha pontos
    keypoints.forEach((kp) => {
      if (!kp.name) return;
      if (!keypointNames.has(kp.name)) return;
      if ((kp.score ?? 0) < 0.5) return;

      ctx.beginPath();
      ctx.arc(kp.x, kp.y, pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = pointColor;
      ctx.fill();
    });

    ctx.restore();
  };

  useEffect(() => {
    let isCancelled = false;

    const start = async () => {
      await init();
      if (!isCancelled) requestAnimationFrame(detectPose);
    };

    start();

    return () => {
      isCancelled = true;
      if (detectorRef.current) {
        detectorRef.current.dispose();
        detectorRef.current = null;
      }
    };
  }, []); // <- monta só uma vez

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ display: "block" }}
        />
      </div>
      <h1 style={{ marginTop: "10px" }}>
        {exerciseInfo.description
          ? exerciseInfo.description
          : "No description available for this exercise"}
      </h1>
    </>
  );
}

export default ComputerVision;
