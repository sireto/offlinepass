import { ImageLoader, ImageLoaderProps } from "next/image";

export const customLoader: ImageLoader = ({ src, width }: ImageLoaderProps) => {
  return src;
};
