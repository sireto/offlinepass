import globalConstants from "@app/constants/global";
import Head from "next/head";
import React from "react";

export default function Seo() {
  const { title, appDesc, appName, url, themeColor, socialPreview } =
    globalConstants;
  const {
    title: ogTitle,
    desc: ogDesc,
    image: ogImage,
    imageAlt,
    imageWidth,
    imageHeight,
    imageType,
    url: canonicalUrl,
  } = socialPreview;

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={appDesc} />
      <meta name="application-name" content={appName} />
      <meta name="apple-mobile-web-app-title" content={appName} />
      <meta name="theme-color" content={themeColor} />
      <meta name="color-scheme" content="light" />
      <meta name="robots" content="index,follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={appName} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content={new URL(url).hostname} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/ogimage.png" />
    </Head>
  );
}
