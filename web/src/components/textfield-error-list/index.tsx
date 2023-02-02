import { MskErrorEnums } from "@app/models/enums/errorEnums";
import { checkMskValidation } from "@app/utils/passwordUtils";
import React from "react";
import TextFieldError from "@app/components/textfield-error";
import { mskErrorsConstants } from "@app/constants/error-constants";

interface ITextFieldErrorList {
  value: string;
}

export default function TextFieldErrorList({ value }: ITextFieldErrorList) {
  const mskErrors = [
    MskErrorEnums.LENGTH,
    MskErrorEnums.LOWERCASE,
    MskErrorEnums.SPECIAL_CHARACTER,
    MskErrorEnums.UPPERCASE,
    MskErrorEnums.NUMBER,
  ];
  return (
    <div className="flex flex-col text-xs text-textfield_label  -mt-3 mb-4 space-y-2">
      <p className=" font-semibold">Password Must contain the following :</p>
      {mskErrors.map((errorText) => {
        return (
          <TextFieldError
            key={errorText}
            showIcon
            error={!checkMskValidation(errorText, value)}
            message={mskErrorsConstants[errorText]}
          />
        );
      })}
    </div>
  );
}
