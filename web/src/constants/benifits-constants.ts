import { BenefitTitles } from "@app/models/enums/benifitsEnums";

export const offlineConstants = {
  title: BenefitTitles.OFFLINE_TITLE,
  description:
    "We generate password using hmac. No central servers or internet required.",
};

export const openSourceConstants = {
  title: BenefitTitles.OPEN_SOURCE_TITLE,
  description:
    "You can modify and share because its design is publicly accessible. \n Source Code : [https://github.com/sireto/offlinepass](https://github.com/sireto/offlinepass)",
};

export const recoverableConstant = {
  title: BenefitTitles.RECOVERABLE_TITLE,
  description:
    "Generated password are recoverable. All you need is seed/secret key,host,username/email,date",
};
