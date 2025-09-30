import { ExerciseInfo } from "../../../exerciseInfo/ExerciseInfo";

export const squatInfo: ExerciseInfo = {
  skeleton: [
    // upper body
    ["shoulder", "hip"],

    // legs
    ["hip", "knee"],
    ["knee", "ankle"],

    //foot
    ["heel", "foot_index"],
    ["heel", "ankle"],
    ["ankle", "foot_index"],
  ],
  description: "squat tracking",
  angleChecks: [
    {
      name: "Knee Flexion",
      points: ["hip", "knee", "ankle"],
      minAngle: 70,
      maxAngle: 180,
      minRange: 140,
      repAngle: 100,
    },
    {
      name: "Hip Posture",
      points: ["shoulder", "hip", "knee"],
      minAngle: 70,
      maxAngle: 180,
    },
    {
      name: "Ankle Posture",
      points: ["knee", "ankle", "foot_index"],
      minAngle: 0,
      maxAngle: 180,
    },
    {
      name: "Back Posture",
      points: ["shoulder", "knee", "ankle"],
      minAngle: 140,
      maxAngle: 180,
    },
  ],
};
