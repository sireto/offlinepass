import React, { useEffect, useState } from "react";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { carouselConstants } from "@app/constants/carousel-constants";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface IcarouselView {
  className: string;
}

export default function CarouselView({ className }: IcarouselView) {
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);
  const carouselItem = () => {
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
      {carouselItem()}
      <div className="absolute flex space-x-3 pt-96">
        <button
          onClick={() => {
            setCarouselSlideIndex(0);
          }}
          type="button"
          className={`w-3 h-3 rounded-full mt-60 ${
            carouselSlideIndex === 0 ? "bg-brand" : "bg-slate-300"
          }`}
        ></button>
        <button
          type="button"
          onClick={() => {
            setCarouselSlideIndex(1);
          }}
          className={`w-3 h-3 rounded-full  mt-60 ${
            carouselSlideIndex === 1 ? "bg-brand" : "bg-slate-300"
          }`}
        ></button>
        <button
          type="button"
          onClick={() => {
            setCarouselSlideIndex(2);
          }}
          className={`w-3 h-3 rounded-full  mt-60 ${
            carouselSlideIndex === 2 ? "bg-brand" : "bg-slate-300"
          }`}
        ></button>
      </div>
    </div>
  );
}
