import {
  openSourceConstants,
  offlineConstants,
  recoverableConstant,
} from "@app/constants/benifits-constants";
import React from "react";
import BenefitsCard from "@app/components/benefits-card";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { useIsMounted } from "@app/lib/hooks/use-is-mounted";

export default function BenefitContainer() {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  //  webview
  if (isMounted && ["xs", "sm", "md"].indexOf(breakpoint) === -1)
    return (
      <div className="flex space-x-24 h-full w-full mt-20 items-center justify-center xl:px-16">
        <div className="space-y-12">
          <p className="text-5xl font-sans text-center">
            Self Service Password Manager
          </p>
          <BenefitsCard benefit={offlineConstants} />
        </div>
        <div className="space-y-16">
          <BenefitsCard benefit={openSourceConstants} />
          <BenefitsCard benefit={recoverableConstant} />
        </div>
      </div>
    );
  // mobile view
  return (
    <div className="space-y-16 bg-lightBackground h-full w-full px-8 pt-16">
      <p className="text-5xl font-sans text-center">
        Self Service Password Manager
      </p>
      <BenefitsCard benefit={offlineConstants} />
      <BenefitsCard benefit={openSourceConstants} />
      <BenefitsCard benefit={recoverableConstant} />
    </div>
  );
}
