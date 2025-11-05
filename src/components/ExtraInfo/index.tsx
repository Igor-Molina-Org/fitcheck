import { ExerciseInfo } from "../../utils/exerciseInfo/ExerciseInfo";
import styles from "./styles.module.css";

type ExtraInfoProps = {
  exerciseInfo: ExerciseInfo;
  onClose: () => void;
};

function ExtraInfo({ exerciseInfo, onClose }: ExtraInfoProps) {
  return (
    <div className={styles.extraInfoOverlay} onClick={onClose}>
      <div className={styles.extraInfoBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        <div className={styles.exerciseName}>
          <h2>{exerciseInfo.information.exerciseName}</h2>
        </div>
        <div className={styles.exerciseDescription}>
          <p>{exerciseInfo.information.exerciseDescription}</p>
        </div>

        <div className={styles.musclesActiveImg}>
          <img
            className={styles.musclesActiveImgUrl}
            src={exerciseInfo.information.musclesActiveImgUrl}
            alt={exerciseInfo.information.exerciseDescription}
          />
        </div>

        <div className={styles.exercisetrainingExVid}>
          <iframe
            width="100%"
            height="400"
            src={exerciseInfo.information.trainingExVidUrl}
            title="Vídeo"
            allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
export default ExtraInfo;
