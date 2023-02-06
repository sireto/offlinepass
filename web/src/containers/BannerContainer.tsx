import React from "react";
import cn from "classnames";
import { bannerConstants } from "@app/constants/banner-constants";
import AnchorLink from "@app/components/ui/links/anchor-link";

export default function BannerContainer({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-8 px-4 lg:px-0 min-h-[80vh] lg:py-0 py-10 w-full h-full justify-center text-brand",
        className
      )}
    >
      <p className="text-4xl font-semibold lg:text-6xl">
        {bannerConstants.title}
      </p>
      <p className="text-lg lg:text-2xl">{bannerConstants.description}</p>
      <AnchorLink
        target="_blank"
        href="https://chrome.google.com/webstore/detail/offline-pass/dohnghdcmkckopegdlbjagkpdcadapmd"
        className="bg-buttonColor hover:bg-brand px-4 py-3 text-white w-[140px]"
      >
        Try Extension
      </AnchorLink>
    </div>
  );
}
