import ComputerVision from "../../components/ComputerVision";
import { barbellBicepsCurlInfo } from "../../utils/exerciseSkeletons/muscularGroups/arms/barbellBicepsCurl";

export function Home() {
  return (
    <>
      <h1>Home!</h1>
      <ComputerVision exerciseInfo={barbellBicepsCurlInfo} />
    </>
  );
}
