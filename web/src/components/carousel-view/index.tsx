import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { customLoader } from "@app/utils/customLoaderUtils";
import cn from "classnames";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css/bundle";

import { Pagination } from "swiper";
import remarkGfm from "remark-gfm";
import SwiperComponent from "@app/components/swiper";
import CarouselSliderButton from "@app/components/ui/carousel-slider-button";

export default function CarouselView({ className }) {
  const swiperRef = useRef<SwiperCore>();
  const [ActiveIndex, setActiveIndex] = useState(0);
  // autoplay init
  SwiperCore.use([Autoplay]);
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
        className="flex flex-col items-center lg:pt-16 sm:pt-0 justify-center space-y-4 lg:space-y-8"
      >
        <Image
          src={carouselConstants[carouselIndex].src}
          height={350}
          width={350}
          loader={customLoader}
          alt="Cartooon logo"
        />
        <p className="text-xl md:text-2xl text-center font-bold text-[#303030]">
          {carouselConstants[carouselIndex].title}
        </p>
        <ReactMarkdown
          children={carouselConstants[carouselIndex].description}
          remarkPlugins={[remarkGfm]}
          className="text-sm md:text-lg text-center font-medium text-lightGray"
        />
      </div>
    );
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "px-6 md:px-12 2xl:px-26 pt-16 md:py-20 h-full lg:py-0 relative ",
        className
      )}
    >
      {/* previous button */}
      <CarouselSliderButton
        IconClassName=" h-6 w-6 text-brand rotate-90"
        className={cn(
          "cursor-pointer absolute top-10 left-4 rounded-full bg-white px-2 py-2",
          ActiveIndex === 0 ? "hidden" : "flex"
        )}
        onClick={() => swiperRef.current?.slidePrev()}
      />
      <CarouselSliderButton
        IconClassName=" h-6 w-6 text-brand -rotate-90"
        className={cn(
          "cursor-pointer absolute top-10 right-4 rounded-full bg-white px-2 py-2",
          ActiveIndex === 2 ? "hidden" : "flex"
        )}
        onClick={() => swiperRef.current?.slideNext()}
      />
      <SwiperComponent
        spaceBetween={1}
        slidesPerView={1}
        autoplay
        onInit={onInit}
        speed={500}
        pagination={{
          clickable: true,
        }}
        className="lg:h-[620px] h-[470px]"
        modules={[Pagination]}
        onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
        carouselItems={[
          getCarouselItem(0),
          getCarouselItem(1),
          getCarouselItem(2),
        ]}
      />
    </div>
  );
}
