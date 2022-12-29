import { BenifitTitle } from "@app/models/enums/benefits";
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
  title: BenifitTitle.OFFLINE_TITLE,
  description:
    "We generate password using hmac. No central servers or internet required.",
};

export const openSourceConstants = {
  title: BenifitTitle.OPEN_SOURCE_TITLE,
  description: "You can modify and share because its design is publicly accessible.",
};

export const recoverableConstant = {
  title: BenifitTitle.RECOVERABLE_TITLE,
  description:
    "Generated password are recoverable. All you need is seed/secret key,host,username/email,date",
};
