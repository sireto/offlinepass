import globalConstants from "@app/constants/global";
import { NextSeo } from "next-seo";
import React from "react";

export default function Seo() {
  return (
    <NextSeo
      title={globalConstants.title}
      description={globalConstants.appDesc}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: globalConstants.socialPreview.url,
        site_name: globalConstants.appName,
        description: globalConstants.socialPreview.desc,
        title: globalConstants.title,
        images: [
          {
            url: globalConstants.socialPreview.image,
            width: 1200,
            height: 630,
            alt: "Og Image Alt",
          },
        ],
      }}
      twitter={{
        handle: globalConstants.twitterHandle,
        site: globalConstants.url,
        cardType: "summary_large_image",
      }}
      facebook={{
        appId: "1234567890",
      }}
    />
  );
}
