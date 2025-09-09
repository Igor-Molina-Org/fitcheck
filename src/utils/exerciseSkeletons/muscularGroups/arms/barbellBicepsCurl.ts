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

    // feet
    ["left_ankle", "left_heel"],
    ["left_ankle", "left_foot_index"],
  ],
  description: "Barbell biceps tracking",
};
