import { MskErrorEnums } from "@app/models/enums/errorEnums";
type MskErrors = MskErrorEnums.LENGTH | MskErrorEnums.LOWERCASE | MskErrorEnums.NUMBER | MskErrorEnums.SPECIAL_CHARACTER | MskErrorEnums.UPPERCASE;
export const mskErrorsConstants:Record<MskErrors,string> = {
  LOWERCASE :"A lowercase letter",
  UPPERCASE : "A capital letter",
  NUMBER : "A Number",
  SPECIAL_CHARACTER : "A special character  `!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~",
  LENGTH : "Minimum 8 characters",
}
