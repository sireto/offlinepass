import { BenifitDto } from "@app/models/dtos/benifitsdto";
import { benifitTitle } from "@app/models/enums/benifits";
import React from "react";
import { Lock } from "@app/components/icons/lock";
import { Recover } from "@app/components/icons/recover";
import Offline from '@app/assets/images/no_wifi.png'
import Image from "next/image";

interface IBenifitCard {
  benifit: BenifitDto;
}

export default function BenifitCard({ benifit }: IBenifitCard) {
  const iconClassName = "h-20 w-20 text-brand";
  function IconSelector() {
    let icon;
    if (benifit.title === benifitTitle.offlineTitle) {
      icon = <Image alt="" src={Offline} height={80} width={80}/>
    } else if (benifit.title === benifitTitle.encryptedTitle) {
      icon = <Lock className={iconClassName} />;
    } else {
      icon = <Recover className={iconClassName} />;
    }
    return icon;
  }
  return (
    <div className="px-10 py-10 flex flex-col bg-slate-100 rounded-xl text-center items-center">
      {IconSelector()}
      <p className="font-semibold text-xl mt-8 mb-1">{benifit.title}</p>
      <p className="text-gray-500 text-lg">{benifit.description}</p>
    </div>
  );
}
