import React, { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CarouselIndicator from "../ui/carousel-indicator";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { customLoader } from "@app/components/customloader";

interface IcarouselView {
  className: string;
}

export default function CarouselView({ className }: IcarouselView) {
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);
  const breakpoint = useBreakpoint();

  const getCarouselItem = () => {
    return (
      <>
        <Image
          src={carouselConstants[carouselSlideIndex].src}
          height={450}
          width={450}
          loader= {customLoader}
          alt="Cartooon logo"
        />
        <p className="text-xl md:text-2xl text-center font-bold text-[#303030]">
          {carouselConstants[carouselSlideIndex].title}
        </p>
        <ReactMarkdown
          children={carouselConstants[carouselSlideIndex].description}
          remarkPlugins={[remarkGfm]}
          className="text-sm md:text-lg text-center font-medium text-lightGray"
        />
      </>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (carouselSlideIndex >= carouselConstants.length - 1) {
        // reset
        setCarouselSlideIndex(0);
      } else {
        setCarouselSlideIndex(carouselSlideIndex + 1);
      }
    }, 5000);
  }, [carouselSlideIndex]);

  const size =
    ["md", "lg", "xl", "2xl", "3xl"].indexOf(breakpoint) > 0 ? "small" : "mini";

  return (
    <div
      className={`flex relative flex-col  px-8 md:px-14 2xl:px-28  py-16 md:py-20 lg:py-0 items-center  justify-center space-y-4 lg:space-y-10 bg-lightBackground ${className}`}
    >
      {getCarouselItem()}

      {/* carousel indicators */}
      <div className="absolute flex space-x-3 bottom-6 lg:bottom-12">
        <CarouselIndicator
          onClick={() => {
            setCarouselSlideIndex(0);
          }}
          size={size}
          color={carouselSlideIndex === 0 ? "primary" : "slate"}
        />
        <CarouselIndicator
          onClick={() => {
            setCarouselSlideIndex(1);
          }}
          size={size}
          color={carouselSlideIndex === 1 ? "primary" : "slate"}
        />
        <CarouselIndicator
          onClick={() => {
            setCarouselSlideIndex(1);
          }}
          size={size}
          color={carouselSlideIndex === 2 ? "primary" : "slate"}
        />
      </div>
    </div>
  );
}
