import React, { useEffect, useState } from "react";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { caroselConstants } from "@app/constants/carousel-constant";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface IcarouselView {
  className:string;
}

export default function CarouselView({className}:IcarouselView) {
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);
  const carouselItem = () => {
    return (
      <>
        <Image
          src={caroselConstants[carouselSlideIndex].src}
          height={500}
          width={450}
          alt="Cartooon logo"
        />
        <p className="text-2xl text-center font-bold">
          {caroselConstants[carouselSlideIndex].title}
        </p>
        <ReactMarkdown
          children={caroselConstants[carouselSlideIndex].description}
          remarkPlugins={[remarkGfm]}
          className="text-lg text-center font-medium text-gray-500"
        />
      </>
    );
  };
  useEffect(() => {
    setTimeout(() => {
      if (carouselSlideIndex === 2) {
        setCarouselSlideIndex(0);
      } else if (carouselSlideIndex === 0) {
        setCarouselSlideIndex(1);
      } else {
        setCarouselSlideIndex(2);
      }
    }, 5000);
  }, [carouselSlideIndex]);

  return (
    <div className={`flex relative flex-col pb-60 px-10 items-center pt-20 justify-center space-y-10 bg-lightBackground ${className}`} >
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
