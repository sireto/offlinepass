import { MskErrorEnums } from "@app/models/enums/errorEnums";
import { checkMskValidation } from "@app/utils/passwordUtils";
import React from "react";
import TextFieldError from "@app/components/textfield-error";
import { mskErrorsConstants } from "@app/constants/error-constants";
import useFormContext from "../form-views/form-context";

export default function TextFieldErrorList() {
  const mskErrors = [
    MskErrorEnums.LENGTH,
    MskErrorEnums.LOWERCASE,
    MskErrorEnums.SPECIAL_CHARACTER,
    MskErrorEnums.UPPERCASE,
    MskErrorEnums.NUMBER,
  ];
  const { formContext } = useFormContext();
  return (
    <div className="flex flex-col text-xs text-textfield_label  -mt-2 mb-2 space-y-2">
      <p className=" font-semibold">Password Must contain the following :</p>
      {mskErrors.map((error) => {
        return (
          <TextFieldError
            key={error}
            showIcon
            error={!checkMskValidation(error, formContext.generatePswState.msk)}
            message={mskErrorsConstants[error]}
          />
        );
      })}
    </div>
  );
}
