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
interface ImageRendererProps {
  imageSrc: string;
}

export default function ImageRenderer({ imageSrc }: ImageRendererProps) {
  return <ImageDiv src={imageSrc} alt="Offline Pass" />;
}
