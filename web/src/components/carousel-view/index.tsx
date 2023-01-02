import React, { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CarouselIndicator from "../ui/carousel-indicator";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { customLoader } from "../customloader";
import { useIsMounted } from "@app/lib/hooks/use-is-mounted";
import { useCarouselIndex } from "@app/lib/hooks/use-carousel-slide-index";

interface IcarouselView {
  className: string;
}

export default function CarouselView({ className }: IcarouselView) {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  const { carouselIndex, setCarouselIndex } = useCarouselIndex();
  const getCarouselItem = () => {
    return (
      <>
        <Image
          src={carouselConstants[carouselIndex].src}
          height={450}
          width={450}
          loader={customLoader}
          alt="Cartooon logo"
        />
        <p className="text-xl md:text-2xl text-center font-bold text-[#303030]">
          {carouselConstants[carouselIndex].title}
        </p>
        <ReactMarkdown
          children={carouselConstants[carouselIndex].description}
          // remarkPlugins={[remarkGfm]}
          className="text-sm md:text-lg text-center font-medium text-lightGray"
        />
      </>
    );
  };

  const sliderTime = setTimeout(() => {
    if (carouselIndex === 2) {
      setCarouselIndex(0);
    } else if (carouselIndex === 1) {
      setCarouselIndex(2);
    } else if (carouselIndex === 0) {
      setCarouselIndex(1);
    }
  }, 5000);

  useEffect(() => {
    sliderTime;
  }, []);

  return (
    <div
      className={`flex relative flex-col  px-8 md:px-14 2xl:px-28  py-16 md:py-20 lg:py-0 items-center  justify-center space-y-4 lg:space-y-10 bg-lightBackground ${className}`}
    >
      {getCarouselItem()}

      {/* carousel indicators */}
      <div className="absolute flex space-x-3 bottom-6 lg:bottom-12">
        <CarouselIndicator
          onClick={() => {
            setCarouselIndex(0);
            clearInterval(sliderTime);
          }}
          size={
            isMounted && ["xs", "sm"].indexOf(breakpoint) < 0 ? "small" : "mini"
          }
          color={carouselIndex === 0 ? "primary" : "slate"}
        />
        <CarouselIndicator
          onClick={() => {
            setCarouselIndex(1);
            clearInterval(sliderTime);
          }}
          size={
            isMounted && ["xs", "sm"].indexOf(breakpoint) < 0 ? "small" : "mini"
          }
          color={carouselIndex === 1 ? "primary" : "slate"}
        />
        <CarouselIndicator
          onClick={() => {
            setCarouselIndex(2);
            clearInterval(sliderTime);
          }}
          size={
            isMounted && ["xs", "sm"].indexOf(breakpoint) < 0 ? "small" : "mini"
          }
          color={carouselIndex === 2 ? "primary" : "slate"}
        />
      </div>
    </div>
  );
}
