import { FC, useEffect, useRef, useState } from "react";
import { useMotionValue, PanInfo, animate } from "framer-motion";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Slide from "../Slide";
import style from "./style.module.css";

interface CarouselProps {
  slides: string[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const viewportIndex = [-1, 0, 1];
  const motionValue = useMotionValue(0);

  const calculateNewX = () =>
    -current * (imageContainerRef.current?.clientWidth || 0);

  // Go to the previous slide
  const handlePrev = () => {
    setCurrent((newIndex) => newIndex - 1);
  };

  // Go to the next slide
  const handleNext = () => {
    setCurrent((newIndex) => newIndex + 1);
  };

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    // Get the width of the image container
    const clientWidth = imageContainerRef.current?.clientWidth || 0;

    const { offset } = dragProps;

    if (offset.x > clientWidth / 4) {
      // Go to previous slide if drag is long enough
      setCurrent(current - 1);
    } else if (offset.x < -clientWidth / 4) {
      // Go to next slide if drag is long enough
      setCurrent(current + 1);
    } else {
      // Go back to the current slide animation
      animate(motionValue, calculateNewX(), { type: "spring", bounce: 0 });
    }
  };

  useEffect(() => {
    const controls = animate(motionValue, calculateNewX(), {
      type: "spring",
      bounce: 0,
    });
    return () => controls.stop(); // Stop the animation when the component unmounts
  }, [current]);

  return (
    <div className={style.carousel}>
      <div className={style.imagesContainer} ref={imageContainerRef}>
        {viewportIndex.map((value) => {
          const index = current + value;
          const modulo = index % slides.length;
          const imageIndex = modulo < 0 ? slides.length + modulo : modulo;
          return (
            <Slide
              key={index}
              index={index}
              url={slides[imageIndex]}
              handleEndDrag={handleEndDrag}
              x={motionValue}
            />
          );
        })}
      </div>

      <FaChevronLeft
        className={style.leftArrow}
        onClick={() => {
          handlePrev();
        }}
      />

      <FaChevronRight
        className={style.rightArrow}
        onClick={() => {
          handleNext();
        }}
      />

      <div>
        {slides.map((slide, index) => {
          const curentDot =
            ((current % slides.length) + slides.length) % slides.length;
          return (
            <GoDotFill
              key={index}
              fill={index === curentDot ? "#000" : "#fff"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
