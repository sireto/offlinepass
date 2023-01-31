import React from "react";
import Logo from "@app/components/ui/logo";

import { useIsMounted } from "@app/lib/hooks/use-is-mounted";
import { useWindowScroll } from "@app/lib/hooks/use-window-scroll";
import GithubButton from "@app/components/ui/button/github-button";

export function Header() {
  const windowScroll = useWindowScroll();
  const isMounted = useIsMounted();

  return (
    <nav
      className={`fixed top-0 z-30 flex w-full items-center justify-between px-4 transition-all duration-300  sm:px-6 lg:px-8 xl:px-10 3xl:px-12 ${
        isMounted && windowScroll.y > 10
          ? "h-16 lg:h-20 shadow-card backdrop-blur"
          : "h-16 lg:h-20  bg-blue-50"
      }`}
    >
      <main className="flex items-center justify-between w-full">
        <Logo />
        <GithubButton />
      </main>
    </nav>
  );
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col font-inter min-h-screen bg-gradient-to-b from-white via-blue-300 to-white dark:bg-dark">
      <Header />
      <main className={`lg:h-screen w-screen pt-20 cursor-default`}>
        {children}
      </main>
    </div>
  );
}
