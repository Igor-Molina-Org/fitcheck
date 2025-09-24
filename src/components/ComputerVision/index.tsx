import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";
import { ExerciseInfo } from "../../utils/ExerciseInfo";
import styles from "./styles.module.css";

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
        width: { ideal: 1920 },
        height: { ideal: 1080 },
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

      canvasRef.current.style.display = "block";
      canvasRef.current.style.overflow = "hidden";
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

  function calculateAngle(
    a: poseDetection.Keypoint,
    b: poseDetection.Keypoint,
    c: poseDetection.Keypoint
  ): number {
    //Getting Line from points
    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };

    //Dot Product from lines
    const dot = ab.x * cb.x + ab.y * cb.y;

    //Getting line length
    const lengthAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const lengthCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

    const cosineAngle = dot / (lengthAB * lengthCB);
    const angle = Math.acos(cosineAngle) * (180 / Math.PI);

    return angle;
  }

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
    const pointRadius = 4;
    const correctColor = "lime";
    const wrongColor = "red";

    const incorrectSegments = new Set<string>();

    if (exerciseInfo.angleChecks) {
      exerciseInfo.angleChecks.forEach((check) => {
        const [a, b, c] = check.points.map((pointName) =>
          keypoints.find((kp) => kp.name === pointName)
        );

        if (a && b && c) {
          const angle = calculateAngle(a, b, c);
          if (angle < check.minAngle || angle > check.maxAngle) {
            check.points.forEach((p) => incorrectSegments.add(p));
          }
        }
      });
    }

    // desenha linhas
    skeleton.forEach(([startName, endName]) => {
      const start = keypoints.find((kp) => kp.name === startName);
      const end = keypoints.find((kp) => kp.name === endName);

      if (!start || !end) return;
      if ((start.score ?? 0) < 0.5 || (end.score ?? 0) < 0.5) return;

      // Cor padrão
      const color =
        incorrectSegments.has(endName) && incorrectSegments.has(startName)
          ? wrongColor
          : correctColor;

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.stroke();
    });

    // desenha pontos
    keypoints.forEach((kp) => {
      if (!kp.name) return;
      if (!keypointNames.has(kp.name)) return;
      if ((kp.score ?? 0) < 0.5) return;

      // Define a cor padrão
      const color = incorrectSegments.has(kp.name) ? wrongColor : correctColor;

      // Desenha cada ponto separadamente
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
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
      <h2 className={styles.exerciseDescription}>
        {exerciseInfo.description
          ? exerciseInfo.description
          : "No description available for this exercise"}
      </h2>

      <div className={styles.cameraContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={styles.video}
        />
      </div>
    </>
  );
}

export default ComputerVision;
