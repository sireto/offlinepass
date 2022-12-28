import { BenefitTitles } from "@app/models/enums/benifitEnums";
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
  title: BenefitTitles.OFFLINE_TITLE,
  description:
    "We generate password using hmac. No central servers or internet required.",
};

export const encryptedConstants = {
  title: BenefitTitles.ENCRYPTED_TITLE,
  description: "ALL passwords are algorithmically generated",
};

export const recoverableConstant = {
  title: BenefitTitles.RECOVERABLE_TITLE,
  description:
    "Generated password are recoverable. All you need is seed/secret key,host,username/email,date",
};
