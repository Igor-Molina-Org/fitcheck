import { AngleCheck } from "./angleCheck";
import { Information } from "./Information";

export type ExerciseInfo = {
  information: Information;
  skeleton: Array<[string, string]>;
  angleChecks: AngleCheck[];
};
