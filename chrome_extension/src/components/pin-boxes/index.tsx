import classNames from "classnames";
import React, { useState } from "react";
import { PinInput } from "react-input-pin-code";
import { PinInputProps } from "react-input-pin-code/dist/types/PinInput";

interface IPinInputsProps extends PinInputProps {
  label: string;
  error?: string;
}

const PinInputs: React.FC<IPinInputsProps> = ({
  type,
  size,
  autoFocus,
  onChange,
  values,
  label,
  error,
  mask = false,
  showState = false,
}) => {
  return (
    <div>
      <p className="font-medium pb-3 text-md text-black">{label}</p>
      <PinInput
        autoFocus={autoFocus}
        type={type}
        mask={mask}
        size={size}
        placeholder=""
        inputClassName="text-black"
        showState={showState}
        onChange={onChange}
        values={values}
        inputStyle={{ marginLeft: 2 }}
      />
      <p
        className={classNames(
          "text-danger text-xs ",
          error !== "" ? "pt-3" : "pt-7"
        )}
      >
        {error}
      </p>
    </div>
  );
};
export default PinInputs;
