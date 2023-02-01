import React from "react";
import CookieConsent from "react-cookie-consent";
import AnchorLink from "@app/components/ui/links/anchor-link";

export default function Cookie() {
  return (
    <CookieConsent
      location="bottom"
      cookieName="OfflinePassCookies"
      expires={365}
      buttonStyle={{
        marginRight: 90,
      }}
    >
      This website uses cookies to enhance the user experience.
      <AnchorLink
        href="https://www.termsfeed.com/blog/cookies/"
        target="_blank"
      >
        <a className=" text-blue-500 pl-3" target="_blank">
          Learn More
        </a>
      </AnchorLink>
    </CookieConsent>
  );
}
