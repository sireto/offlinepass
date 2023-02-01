import React from "react";
import AnchorLink from "@app/components/ui/links/anchor-link";
import { Github } from "@app/components/icons/github";
import cn from "classnames";

type SizeNames = "large" | "small";

const sizes: Record<SizeNames, string> = {
  large: "h-6 w-6",
  small: "h-4 w-4",
};

interface IGithuBBttonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconColor?: string;
  iconSize?: string;
}

const GithubButton: React.FC<IGithuBBttonProps> = ({
  className,
  iconColor,
  iconSize = sizes.large,
}) => {
  return (
    <AnchorLink
      target="_blank"
      href="https://github.com/sireto/offlinepass"
      className={cn("flex space-x-4 text-brand", className)}
    >
      <p>Github</p>
      <Github className={iconSize} fill={iconColor} />
    </AnchorLink>
  );
};

export default GithubButton;
