import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import cn from "classnames";
import SwiperCore from "swiper";
import { Pagination } from "swiper";
import remarkGfm from "remark-gfm";
import SwiperComponent from "@app/components/swiper";
import CarouselSliderButton from "@app/components/ui/button/carousel-slider-button";
import ImageRenderer from "@app/components/media-renderer/image-renderer";

export default function CarouselView({ className }) {
  const swiperRef = useRef<SwiperCore>();
  const [ActiveIndex, setActiveIndex] = useState(0);
  // swiper ref
  const onInit = (Swiper: SwiperCore): void => {
    swiperRef.current = Swiper;
  };
  // hover on carousel pause
  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };
  const getCarouselItem = (carouselIndex: number) => {
    return (
      <div
        key={carouselIndex}
        className="flex flex-col py-10 items-center px-4 lg:h-[560px] sm:h-[500px]   space-y-2 lg:space-y-6"
      >
        <div className="h-[240px] w-[400px] flex items-center ">
          <ImageRenderer src={carouselConstants[carouselIndex].src} />
        </div>

        <p className="text-xl md:text-2xl text-center font-bold text-[#303030]">
          {carouselConstants[carouselIndex].title}
        </p>
        <ReactMarkdown
          children={carouselConstants[carouselIndex].description}
          remarkPlugins={[remarkGfm]}
          className="text-sm md:text-md text-center font-medium text-lightGray"
        />
      </div>
    );
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        " h-full flex flex-col pt-10  items-center justify-center  relative",
        className
      )}
    >
      {/* previous button */}
      <CarouselSliderButton
        IconClassName="rotate-90"
        className={cn(
          " absolute top-1/2 left-4",
          ActiveIndex === 0 ? "hidden" : "flex"
        )}
        onClick={() => swiperRef.current?.slidePrev()}
      />
      {/* next button */}
      <CarouselSliderButton
        IconClassName="-rotate-90"
        className={cn(
          "absolute top-1/2 right-4",
          ActiveIndex === 2 ? "hidden" : "flex"
        )}
        onClick={() => swiperRef.current?.slideNext()}
      />
      <div className=" w-5/6 align-middle pt-4  rounded-xl">
        <SwiperComponent
          autoplay
          onInit={onInit}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
          carouselItems={[
            getCarouselItem(0),
            getCarouselItem(1),
            getCarouselItem(2),
          ]}
        />
      </div>
    </div>
  );
}
