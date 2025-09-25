export interface AngleCheck {
  name: string; //Name for the angle to be checked, ex: elbowFlexion
  points: [string, string, string]; // ex: ["left_shoulder", "left_elbow", "left_wrist"]
  minAngle: number;
  maxAngle: number;
  //Only the main exercise flexion has these
  //Necessary angle to count a Rep
  repAngle?: number;
  //necessary Range to start a Rep
  minRange?: number;
}
