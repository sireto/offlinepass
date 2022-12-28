<<<<<<<< HEAD:web/src/constants/benefits-constants.ts
import { BenifitTitle } from "@app/models/enums/benefits";
========
import { BenefitTitles } from "@app/models/enums/benifitEnums";
>>>>>>>> 8dc141dc (Refractor codebase):web/src/constants/benifit-constants.ts
// export const BenifitsConstants = [
//   {
//     title: "Fully Offline",
//     body: "We generate password using hmac. No central servers or internet required.",
//   },
//   {
//     title: "Encrypted Offline",
//     body: "ALL passwords are algorithmically generated",
//   },
//   {
//     title: "Recoverable",
//     body: "Generated password are recoverable. All you need is seed/secret key,host,username/email,date",
//   },
// ];

export const offlineConstants = {
<<<<<<<< HEAD:web/src/constants/benefits-constants.ts
  title: BenifitTitle.OFFLINE_TITLE,
========
  title: BenefitTitles.OFFLINE_TITLE,
>>>>>>>> 8dc141dc (Refractor codebase):web/src/constants/benifit-constants.ts
  description:
    "We generate password using hmac. No central servers or internet required.",
};

<<<<<<<< HEAD:web/src/constants/benefits-constants.ts
export const openSourceConstants = {
  title: BenifitTitle.OPEN_SOURCE_TITLE,
  description: "You can modify and share because its design is publicly accessible. \n Source Code : [https://github.com/sireto/offlinepass](https://github.com/sireto/offlinepass)",
};

export const recoverableConstant = {
  title: BenifitTitle.RECOVERABLE_TITLE,
========
export const encryptedConstants = {
  title: BenefitTitles.ENCRYPTED_TITLE,
  description: "ALL passwords are algorithmically generated",
};

export const recoverableConstant = {
  title: BenefitTitles.RECOVERABLE_TITLE,
>>>>>>>> 8dc141dc (Refractor codebase):web/src/constants/benifit-constants.ts
  description:
    "Generated password are recoverable. All you need is seed/secret key,host,username/email,date",
};
