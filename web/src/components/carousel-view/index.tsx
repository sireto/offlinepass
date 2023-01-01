import React, { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CarouselIndicator from "../ui/carousel-indicator";

interface IcarouselView {
  className:string;
}

export default function CarouselView({className}:IcarouselView) {
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);
  const getCarouselItem = () => {
    return (
      <>
        <Image
          src={carouselConstants[carouselSlideIndex].src}
          height={450}
          width={450}
          alt="Cartooon logo"
        />
        <p className="text-2xl text-center font-bold text-[#303030]">
          {carouselConstants[carouselSlideIndex].title}
        </p>
        <ReactMarkdown
          children={carouselConstants[carouselSlideIndex].description}
          remarkPlugins={[remarkGfm]}
          className="text-lg text-center font-medium text-lightGray"
        />
      </>
    );
  };

  // const getCarouselIndicator = (onClick: MouseEventHandler | undefined, className) => {
  //   return (
  //     <button
  //       onClick={onClick}
  //       type="button"
  //       className={`w-3 h-3 rounded-full mt-60 ${
  //         carouselSlideIndex === 0 ? "bg-brand" : "bg-slate-300"
  //       }`}
  //     ></button>
  //   );
  // };

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

  return (
    <div
      className={`flex relative flex-col  px-28 items-center  justify-center space-y-10 bg-lightBackground ${className}`}
    >
      {getCarouselItem()}

      {/* carousel indicators */}
      <div className="absolute flex space-x-3 bottom-12">
        <CarouselIndicator
          onClick={() => {
            setCarouselSlideIndex(0);
          }}
          color={carouselSlideIndex === 0 ? "primary" : "slate"}
        />
        <CarouselIndicator
          onClick={() => {
            setCarouselSlideIndex(1);
          }}
          color={carouselSlideIndex === 1 ? "primary" : "slate"}
        />
        <CarouselIndicator
          onClick={() => {
            setCarouselSlideIndex(1);
          }}
          color={carouselSlideIndex === 2 ? "primary" : "slate"}
        />
      </div>
    </div>
  );
}
