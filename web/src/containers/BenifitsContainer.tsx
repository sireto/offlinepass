import {
  openSourceConstants,
  offlineConstants,
  recoverableConstant,
<<<<<<< HEAD
} from "@app/constants/benefits-constants";
=======
} from "@app/constants/benifit-constants";
>>>>>>> 8dc141dc (Refractor codebase)
import React from "react";
import BenefitsCard from "@app/components/benefit-card";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { useIsMounted } from "@app/lib/hooks/use-is-mounted";

export default function BenefitContainer() {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  //  webview
  if (
    isMounted &&
    (["xs", "sm", "md", "lg"].indexOf(breakpoint) === -1 ||
      ["xs", "sm", "md", "lg"].indexOf(breakpoint) === 3)
  )
    return (
      <div className="flex space-x-24 h-full w-full mt-20 items-center justify-center xl:px-16">
        <div className="space-y-12">
          <p className="text-5xl font-sans text-center">
            Self Service Password Manager
          </p>
<<<<<<< HEAD
          <BenefitsCard benefit={offlineConstants} />
        </div>
        <div className="space-y-16">
          <BenefitsCard benefit={openSourceConstants} />
          <BenefitsCard benefit={recoverableConstant} />
=======
          <BenifitsCard
            title={offlineConstants.title}
            description={offlineConstants.description}
          />
        </div>
        <div className="space-y-16">
          <BenifitsCard
            title={encryptedConstants.title}
            description={encryptedConstants.description}
          />
          <BenifitsCard
            title={recoverableConstant.title}
            description={recoverableConstant.description}
          />
>>>>>>> 8dc141dc (Refractor codebase)
        </div>
      </div>
    );
  // mobile view
  return (
<<<<<<< HEAD
    <div className="space-y-16 bg-lightBackground h-full w-full px-8 pt-16">
      <p className="text-5xl font-sans text-center">
        Self Service Password Manager
      </p>
      <BenefitsCard benefit={offlineConstants} />
      <BenefitsCard benefit={openSourceConstants} />
      <BenefitsCard benefit={recoverableConstant} />
=======
    <div className="space-y-16 h-full w-full">
      <p className="text-5xl font-sans text-center">Protect you everywhere</p>
      <BenifitsCard
        title={offlineConstants.title}
        description={offlineConstants.description}
      />
      <BenifitsCard
        title={encryptedConstants.title}
        description={encryptedConstants.description}
      />
      <BenifitsCard
        title={recoverableConstant.title}
        description={recoverableConstant.description}
      />
>>>>>>> 8dc141dc (Refractor codebase)
    </div>
  );
}
