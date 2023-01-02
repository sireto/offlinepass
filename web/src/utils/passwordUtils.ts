import { MskErrorEnums } from "@app/models/enums/errorEnums";
import { isContainLowercase, isContainNumber, isContainSpecialCharacter, isContainUppercase, isMinimumCharacter } from "./validationUtils";

export const checkMskValidation = (error:MskErrorEnums,msk:string) => {
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