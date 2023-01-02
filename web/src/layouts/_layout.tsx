import React from "react";
import Logo from "@app/components/ui/logo";

import { useIsMounted } from "@app/lib/hooks/use-is-mounted";
import { useWindowScroll } from "@app/lib/hooks/use-window-scroll";
import PasswordToast from "@app/components/ui/password-toast";

export function Header() {
  const windowScroll = useWindowScroll();
  const isMounted = useIsMounted();

  return (
    <nav
      className={`fixed top-0 z-30 flex w-full items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 xl:px-10 3xl:px-12 ${
        isMounted && windowScroll.y > 10
          ? "h-20 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-24"
          : "h-20 border-b-[0.5px] border-neutral-100 dark:border-neutral-700 bg-white dark:bg-dark sm:h-24"
      }`}
    >
      <main>
        <Logo />
      </main>
    </nav>
  );
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col font-inter min-h-screen bg-white dark:bg-dark">
      <Header />
      <main className={`lg:h-screen w-screen pt-20 sm:pt-20 cursor-default`}>
        {children}
      </main>
    </div>
  );
}
