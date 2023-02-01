import styled from "@emotion/styled";
import React from "react";

const ImageDiv = styled.img`
  height: auto;
  width: 100%;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  object-fit: cover;
`;

const ImageRenderer: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  className,
}) => {
  return <ImageDiv src={src} alt="Offline Pass" className={className} />;
};

export default ImageRenderer;
