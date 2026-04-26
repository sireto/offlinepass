import React, { useEffect, useState } from "react";
import Logo from "@app/components/ui/logo";

import { useIsMounted } from "@app/lib/hooks/use-is-mounted";
import { useWindowScroll } from "@app/lib/hooks/use-window-scroll";
import GithubButton from "@app/components/ui/button/github-button";
import { getGithubStars } from "@app/lib/api/get-github-stars";

export function Header() {
  const windowScroll = useWindowScroll();
  const isMounted = useIsMounted();
  const [githubStars, setGithubStars] = useState(0);
  useEffect(() => {
    const githubStars = async () => {
      await getGithubStars().then((stars) => {
        setGithubStars(stars);
      });
    };
    githubStars();
  }, [githubStars]);

  const isScrolled = isMounted && windowScroll.y > 10;
  return (
    <nav
      className={`fixed top-0 z-30 flex w-full items-center justify-between px-4 lg:px-8 transition-all duration-300 h-16 lg:h-20 ${
        isScrolled
          ? "bg-white/80 backdrop-blur border-b border-textfield_stroke"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <Logo />
        <GithubButton githubStars={githubStars} />
      </div>
    </nav>
  );
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col font-inter min-h-screen bg-white text-brand">
      <Header />
      <main className="w-full pt-16 lg:pt-20 cursor-default">{children}</main>
    </div>
  );
}
