import globalConstants from "@app/constants/global";
import Head from "next/head";
import React from "react";

export default function Seo() {
  const { title, appDesc, socialPreview, appName } = globalConstants;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={appDesc} />
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IE" />
      <meta property="og:site_name" content={appName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={socialPreview.desc} />
      <meta property="og:url" content={socialPreview.url} />
      <meta property="og:image" content={socialPreview.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={socialPreview.url} />
    </Head>
  );
}
