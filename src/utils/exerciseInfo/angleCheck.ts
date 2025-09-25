export interface AngleCheck {
  name: string; //Name for the angle to be checked, ex: elbowFlexion
  points: [string, string, string]; // ex: ["left_shoulder", "left_elbow", "left_wrist"]
  minAngle: number;
  maxAngle: number;

  //Only the main exercise flexion has these
  //minRange must always be smaller than repAngle
  //necessary Range to start a Rep
  minRange?: number;
  //Necessary angle to count a Rep
  repAngle?: number;
}
