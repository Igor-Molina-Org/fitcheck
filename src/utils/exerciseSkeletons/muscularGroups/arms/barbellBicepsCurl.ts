import { ExerciseInfo } from "../../../exerciseInfo/ExerciseInfo";

export const barbellBicepsCurlInfo: ExerciseInfo = {
  skeleton: [
    // upper body
    ["shoulder", "elbow"],
    ["elbow", "wrist"],
    ["shoulder", "hip"],

    // legs
    ["hip", "knee"],
    ["knee", "ankle"],
  ],
  description: "Barbell biceps tracking",
  angleChecks: [
    {
      name: "Elbow Flexion",
      points: ["shoulder", "elbow", "wrist"],
      minAngle: 45,
      maxAngle: 180,
      minRange: 100,
      repAngle: 65,
    },
    {
      name: "Shoulder Posture",
      points: ["hip", "shoulder", "elbow"],
      minAngle: 0,
      maxAngle: 10,
    },
    {
      name: "Back Posture",
      points: ["shoulder", "hip", "knee"],
      minAngle: 175,
      maxAngle: 180,
    },
  ],
};
