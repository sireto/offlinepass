import GithubButton from "@app/components/ui/button/github-button";
import React from "react";
import cn from "classnames";
import { bannerConstants } from "@app/constants/banner-constants";

export default function BannerContainer({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-8 px-4 lg:px-0 min-h-[80vh]  lg:py-0 py-10 w-full h-full justify-center text-brand",
        className
      )}
    >
      <p className="text-4xl lg:text-6xl">{bannerConstants.title}</p>
      <p className="text-md lg:text-xl">{bannerConstants.description}</p>
      <GithubButton
        className="bg-buttonColor hover:bg-brand px-4 py-3 text-white w-[125px]"
        iconColor="#ffffff"
      />
    </div>
  );
}
