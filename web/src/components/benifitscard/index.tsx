import { BenefitTitles } from "@app/models/enums/benifitEnums";
import React from "react";
import { Lock } from "@app/components/icons/lock";
import { Recover } from "@app/components/icons/recover";
import Offline from "@app/assets/images/no_wifi.png";
import Image from "next/image";

interface IBenifitCard {
  title: string;
  description: string;
}

export default function BenifitCard({ title, description }: IBenifitCard) {
  const iconClassName = "h-20 w-20 text-brand";
  function IconSelector() {
    let icon;
    if (title === BenefitTitles.OFFLINE_TITLE) {
      icon = <Image alt="" src={Offline} height={80} width={80} />;
    } else if (title === BenefitTitles.ENCRYPTED_TITLE) {
      icon = <Lock className={iconClassName} />;
    } else {
      icon = <Recover className={iconClassName} />;
    }
    return icon;
  }
  return (
    <div className="px-10 py-10 flex flex-col bg-slate-100 rounded-xl text-center items-center">
      {IconSelector()}
      <p className="font-semibold text-xl mt-8 mb-1">{title}</p>
      <p className="text-gray-500 text-lg">{description}</p>
    </div>
  );
}
