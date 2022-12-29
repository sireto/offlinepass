import { BenifitDto } from "@app/models/dtos/benifitsdto";
import { BenifitTitle } from "@app/models/enums/benefits";
import React from "react";
import { Lock } from "@app/components/icons/lock";
import { Recover } from "@app/components/icons/recover";
import Offline from '@app/assets/images/no_wifi.png'
import Image from "next/image";
import { Global } from "../icons/global";

interface IBenefitCard {
  benefit: BenifitDto;
}

export default function BenefitCard({ benefit }: IBenefitCard) {
  const iconClassName = "h-20 w-20 text-brand";
  function IconSelector() {
    let icon;
    if (benefit.title === BenifitTitle.OFFLINE_TITLE) {
      icon = <Image alt="" src={Offline} height={80} width={80}/>
    } else if (benefit.title === BenifitTitle.OPEN_SOURCE_TITLE) {
      icon = <Global className={iconClassName} />;
    } else {
      icon = <Recover className={iconClassName} />;
    }
    return icon;
  }
  return (
    <div className="px-10 py-10 flex flex-col bg-white rounded-xl text-center items-center">
      {IconSelector()}
      <p className="font-semibold text-xl mt-8 mb-1">{benefit.title}</p>
      <p className="text-gray-500 text-lg">{benefit.description}</p>
    </div>
  );
}