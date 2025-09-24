import { ExerciseInfo } from "../../../ExerciseInfo";

export const barbellBicepsCurlInfo: ExerciseInfo = {
  skeleton: [
    // upper body
    ["left_shoulder", "left_elbow"],
    ["left_elbow", "left_wrist"],
    ["left_shoulder", "left_hip"],

    // legs
    ["left_hip", "left_knee"],
    ["left_knee", "left_ankle"],
  ],
  description: "Barbell biceps tracking",
  angleChecks: [
    {
      name: "Elbow Flexion",
      points: ["left_shoulder", "left_elbow", "left_wrist"],
      minAngle: 45,
      maxAngle: 180,
    },
    {
      name: "Shoulder Posture",
      points: ["left_hip", "left_shoulder", "left_elbow"],
      minAngle: 0,
      maxAngle: 10,
    },
    {
      name: "Back Posture",
      points: ["left_shoulder", "left_hip", "left_knee"],
      minAngle: 175,
      maxAngle: 180,
    },
  ],
};
