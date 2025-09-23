export interface AngleCheck {
  name: string; //Name for the angle to be checked, ex: elbowFlexion
  points: [string, string, string]; // ex: ["left_shoulder", "left_elbow", "left_wrist"]
  minAngle: number; 
  maxAngle: number; 
}