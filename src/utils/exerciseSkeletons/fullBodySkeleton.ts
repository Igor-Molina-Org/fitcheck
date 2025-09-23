import { ExerciseInfo } from "../ExerciseInfo";

export const fullBodyInfo: ExerciseInfo = {
  skeleton: [
    // upper body
    ["right_shoulder", "left_shoulder"],
    ["left_shoulder", "left_elbow"],
    ["left_elbow", "left_wrist"],
    ["right_shoulder", "right_elbow"],
    ["right_elbow", "right_wrist"],
    ["left_shoulder", "left_hip"],
    ["right_shoulder", "right_hip"],
    ["left_hip", "right_hip"],

    // legs
    ["left_hip", "left_knee"],
    ["left_knee", "left_ankle"],
    ["right_hip", "right_knee"],
    ["right_knee", "right_ankle"],

    // feet
    ["left_ankle", "left_heel"],
    ["right_ankle", "right_heel"],
    ["left_ankle", "left_foot_index"],
    ["right_ankle", "right_foot_index"],
  ],
  description: "Full body tracking",
  angleChecks: []
};

export const fullBodySkeleton: Array<[string, string]> = [];
