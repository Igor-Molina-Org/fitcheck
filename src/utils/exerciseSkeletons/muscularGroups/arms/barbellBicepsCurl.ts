import { ExerciseInfo } from "../../../exerciseInfo/ExerciseInfo";

export const barbellBicepsCurlInfo: ExerciseInfo = {
  information: {
    exerciseName: "Barbell Biceps Curl",
    exerciseDescription: "Exercise for arm strength",
    musclesActiveImgUrl:
      "https://training.fit/wp-content/uploads/2020/02/bizepscurls-stehend-langhantel.png",
    trainingExVidUrl: "https://www.youtube.com/embed/dDI8ClxRS04",
  },
  skeleton: [
    // upper body
    ["shoulder", "elbow"],
    ["elbow", "wrist"],
    ["shoulder", "hip"],

    // legs
    ["hip", "knee"],
    ["knee", "ankle"],
  ],
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
