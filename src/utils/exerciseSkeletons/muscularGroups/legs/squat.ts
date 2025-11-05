import { ExerciseInfo } from "../../../exerciseInfo/ExerciseInfo";

export const squatInfo: ExerciseInfo = {
  information: {
    exerciseName: "Squats",
    exerciseDescription: "Exercise for leg strength",
    musclesActiveImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWtS0dPK2HZ259E9i7XS-CuJajWPZQHcjO5Q&s",
    trainingExVidUrl: "https://www.youtube.com/embed/xqvCmoLULNY",
  },
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
