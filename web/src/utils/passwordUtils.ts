import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { MskErrorEnums } from "@app/models/enums/errorEnums";
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
  console.log(result.visitorId);
};
