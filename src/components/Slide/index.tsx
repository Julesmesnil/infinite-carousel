import { FC } from "react";
import { motion, PanInfo, MotionValue } from "framer-motion";
import style from "./style.module.css";

interface SlideProps {
  index: number;
  url: string;
  handleEndDrag(
    e: Event,
    info: PanInfo
  ): void;
  x: MotionValue<number>;
}

const Slide: FC<SlideProps> = ({ index, url, handleEndDrag, x }) => {
  return (
    <motion.div
      key={index}
      drag="x"
      whileTap={{ cursor: "grabbing" }}
      dragElastic={1}
      onDragEnd={handleEndDrag}
      style={{
        position: `absolute`,
        width: `400px`,
        x,
        left: `${index * 100}%`,
        right: `${index * 100}%`,
      }}
      className={style.images}
    >
      <img src={url} alt="fluid art" className={style.image} />
    </motion.div>
  );
};

export default Slide;
