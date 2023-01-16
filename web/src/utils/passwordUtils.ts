import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { MskErrorEnums } from "@app/models/enums/errorEnums";
import * as CryptoJS from "crypto-js";
import {
  isContainLowercase,
  isContainNumber,
  isContainSpecialCharacter,
  isContainUppercase,
  isMinimumCharacter,
} from "./validationUtils";

const fpPromise = FingerprintJS.load({ monitoring: false });

export const checkMskValidation = (error: MskErrorEnums, msk: string) => {
  switch (error) {
    case MskErrorEnums.LOWERCASE:
      return isContainLowercase(msk);
    case MskErrorEnums.UPPERCASE:
      return isContainUppercase(msk);
    case MskErrorEnums.NUMBER:
      return isContainNumber(msk);
    case MskErrorEnums.SPECIAL_CHARACTER:
      return isContainSpecialCharacter(msk);
    case MskErrorEnums.LENGTH:
      return isMinimumCharacter(msk);
    default:
      return false;
  }
};

export const visitorIdentity = async () => {
  const fp = await fpPromise;
  const result = await fp.get();
  return result.visitorId;
};

export const encrypt = (password: string, visitorId) => {
  return CryptoJS.AES.encrypt(password, visitorId).toString();
};

export const decrypt = (encryptedData: string, visitorId: string) => {
  try {
    if (encryptedData === "" || visitorId === "") return "";
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, visitorId);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedString;
  } catch (e) {
    return "";
  }
};

export const stringTosha256 = (data: string) => {
  if (data === "") return "";
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

// export const sha256ToString = (hash: string) => {
//   return CryptoJS.sha256;
// };

// export const isEncryptedData = (data, visitorId) => {
//   if (decrypt(data, visitorId) === false) {
//     return false;
//   }
//   return true;
// };
