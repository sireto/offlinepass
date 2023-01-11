import React from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css/bundle";

interface ISwiperProps extends SwiperProps {
  carouselItems: Array<JSX.Element>;
}

const SwiperComponent: React.FC<ISwiperProps> = ({
  carouselItems,
  spaceBetween,
  slidesPerView,
  onInit,
  speed,
  pagination,
  className,
  modules,
  navigation,
  grabCursor,
  onRealIndexChange,
  onSwiper,
  autoplay = false,
  allowTouchMove = false,
}) => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      autoplay={autoplay}
      onInit={onInit}
      speed={speed}
      allowTouchMove={allowTouchMove}
      grabCursor={grabCursor}
      navigation={navigation}
      pagination={pagination}
      className={className}
      modules={modules}
      onRealIndexChange={onRealIndexChange}
      onSwiper={onSwiper}
    >
      {carouselItems.map((carouselItem) => {
        return <SwiperSlide key={carouselItem.key}>{carouselItem}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default SwiperComponent;
