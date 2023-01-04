import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CarouselIndicator from "../ui/carousel-indicator";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { customLoader } from "../../utils/customLoaderUtils";
import cn from "classnames";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css/bundle";

import { Pagination } from "swiper";
import remarkGfm from "remark-gfm";

export default function CarouselView({ className }) {
  const swiperRef = useRef<SwiperCore>();
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
      <div className="flex flex-col items-center lg:pt-16 sm:pt-0 justify-center space-y-4 lg:space-y-8">
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
        "px-6 md:px-12 2xl:px-26 pt-16 md:py-20 h-full lg:py-0 ",
        className
      )}
    >
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        autoplay
        onInit={onInit}
        speed={500}
        pagination={{
          clickable: true,
        }}
        className=" lg:h-[620px] h-[470px]"
        modules={[Pagination]}
      >
        <SwiperSlide>{getCarouselItem(0)}</SwiperSlide>
        <SwiperSlide>{getCarouselItem(1)}</SwiperSlide>
        <SwiperSlide>{getCarouselItem(2)}</SwiperSlide>
      </Swiper>
    </div>
  );
}
