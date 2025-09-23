import { AngleCheck } from "./angleCheck";

export type ExerciseInfo = {
  skeleton: Array<[string, string]>;
  description: string;
  angleChecks: AngleCheck[];
};
