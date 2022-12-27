import { benifitTitle } from "@app/models/enums/benifits";
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
  title: benifitTitle.offlineTitle,
  description:
    "We generate password using hmac. No central servers or internet required.",
};

export const encryptedConstants = {
  title: benifitTitle.encryptedTitle,
  description: "ALL passwords are algorithmically generated",
};

export const recoverableConstant = {
  title: benifitTitle.recoverableTitle,
  description:
    "Generated password are recoverable. All you need is seed/secret key,host,username/email,date",
};
