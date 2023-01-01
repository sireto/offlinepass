import { BenifitDto } from "@app/models/dtos/benifitsdto";
import React from "react";
import { Recover } from "@app/components/icons/recover";
import { Global } from "@app/components/icons/global";
import { Nowifi } from "@app/components/icons/nowifi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BenefitTitles } from "@app/models/enums/benifitsEnums";
interface IBenefitCard {
  benefit: BenifitDto;
}

export default function BenefitCard({ benefit }: IBenefitCard) {
  const iconClassName = "h-20 w-20 text-brand";
  function IconSelector() {
    let icon;
    if (benefit.title === BenefitTitles.OFFLINE_TITLE) {
      icon = <Nowifi className={iconClassName} />;
    } else if (benefit.title === BenefitTitles.OPEN_SOURCE_TITLE) {
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
      <ReactMarkdown
        children={benefit.description}
        remarkPlugins={[remarkGfm]}
        className="text-gray-500 text-lg"
      />
      ,
    </div>
  );
}
