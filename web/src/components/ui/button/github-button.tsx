import React from "react";
import AnchorLink from "@app/components/ui/links/anchor-link";
import { Github } from "@app/components/icons/github";
import cn from "classnames";
import { Star } from "@app/components/icons/star";
import { getGithubStars } from "@app/lib/api/get-github-stars";

// type SizeNames = "large" | "small";

// const sizes: Record<SizeNames, string> = {
//   large: "h-6 w-6",
//   small: "h-4 w-4",
// };

interface IGithuBBttonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  githubStars: number;
}

const GithubButton: React.FC<IGithuBBttonProps> = ({
  className,
  githubStars,
}) => {
  return (
    <AnchorLink
      target="_blank"
      href="https://github.com/sireto/offlinepass"
      className={cn(
        "flex space-x-4 py-2 relative text-brand items-center border h-full group border-lightGray  hover:bg-brand hover:text-white rounded-xl text-sm lg:text:lg  px-4",
        className
      )}
    >
      <Github className="fill-black lg:h-6 lg:w-6 h-4 w-4  group-hover:fill-white " />
      <p className="pr-2">Star</p>
      <div className="absolute w-[0.5px] h-[36px] lg:h-[40px] right-9 bg-lightGray"></div>
      <p>{githubStars}</p>
    </AnchorLink>
  );
};

export default GithubButton;
