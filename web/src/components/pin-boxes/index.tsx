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
      <p className="ml-3 font-medium pb-2 text-black">{label}</p>
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
        inputStyle={{ marginLeft: 12 }}
      />
      {error !== "" && (
        <p className="text-danger pl-2 pt-3 text-xs ">{error}</p>
      )}
    </div>
  );
};
export default PinInputs;
