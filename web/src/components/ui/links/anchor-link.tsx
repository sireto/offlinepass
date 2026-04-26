import NextLink, { LinkProps } from "next/link";
import React from "react";

type AnchorLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const AnchorLink: React.FC<AnchorLinkProps> = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
};

export default AnchorLink;
