import {
  encryptedConstants,
  offlineConstants,
  recoverableConstant,
} from "@app/constants/benifits";
import React from "react";
import BenifitsCard from "@app/components/benifitscard";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { useIsMounted } from "@app/lib/hooks/use-is-mounted";

export default function BenifitsContainer() {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  //  webview
  if (isMounted && (["xs", "sm", "md", "lg"].indexOf(breakpoint) === -1 || ["xs", "sm", "md", "lg"].indexOf(breakpoint) >1))
    return (
      <div className="flex space-x-24 h-full w-full items-center justify-center">
        <div className="space-y-12">
          <p className="text-5xl font-sans text-center">
            Protect you everywhere
          </p>
          <BenifitsCard benifit={offlineConstants} />
        </div>
        <div className="space-y-16">
          <BenifitsCard benifit={encryptedConstants} />
          <BenifitsCard benifit={recoverableConstant} />
        </div>
      </div>
    );
    // mobile view
    return (
      <div className="space-y-16 h-full w-full">
        <p className="text-5xl font-sans text-center">Protect you everywhere</p>
        <BenifitsCard benifit={offlineConstants} />
        <BenifitsCard benifit={encryptedConstants} />
        <BenifitsCard benifit={recoverableConstant} />
      </div>
    );
}
