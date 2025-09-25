import { ExerciseInfo } from "../../../exerciseInfo/ExerciseInfo";

export const squatInfo: ExerciseInfo = {
  skeleton: [
    // upper body
    ["right_shoulder", "right_hip"],

    // legs
    ["right_hip", "right_knee"],
    ["right_knee", "right_ankle"],

    //foot
    ["right_heel", "right_foot_index"],
    ["right_heel", "right_ankle"],
    ["right_ankle", "right_foot_index"],
  ],
  description: "squat tracking",
  angleChecks: [
    {
      name: "Knee Flexion",
      points: ["right_hip", "right_knee", "right_ankle"],
      minAngle: 70,
      maxAngle: 180,
      minRange: 140,
      repAngle: 100,
    },
    {
      name: "Hip Posture",
      points: ["right_shoulder", "right_hip", "right_knee"],
      minAngle: 70,
      maxAngle: 180,
    },
    {
      name: "Ankle Posture",
      points: ["right_knee", "right_ankle", "right_foot_index"],
      minAngle: 0,
      maxAngle: 180,
    },
    {
      name: "Back Posture",
      points: ["right_shoulder", "right_knee", "right_ankle"],
      minAngle: 140,
      maxAngle: 180,
    },
  ],
};
