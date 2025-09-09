import ComputerVision from "../../components/ComputerVision";
import { fullBodyInfo } from "../../utils/exerciseSkeletons/fullBodySkeleton";

export function Home() {
  return (
    <>
      <h1>Home!</h1>
      <ComputerVision exerciseInfo={fullBodyInfo} />
    </>
  );
}
