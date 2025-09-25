import { useRef } from "react";

export default function useRepCounter(minRange: number, repAngle: number) {
  const repStarted = useRef(false);

  return (angleResult: number): boolean => {
    if (angleResult > minRange) {
      repStarted.current = true;
    }

    if (angleResult <= repAngle && repStarted.current) {
      repStarted.current = false;
      return true;
    }

    return false;
  };
}
