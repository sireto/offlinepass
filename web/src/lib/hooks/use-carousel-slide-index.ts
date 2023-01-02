import { atom, useAtom } from "jotai";

const carouselIndexAtom = atom(0);
export function useCarouselIndex() {
  const [carouselIndex, setCarouselIndex] = useAtom(carouselIndexAtom);

  return { carouselIndex, setCarouselIndex };
}
