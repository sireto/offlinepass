import React from "react";
import { PinInput } from "react-input-pin-code";
import cn from "classnames";

type PinInputProps = React.ComponentProps<typeof PinInput>;

interface IPinInputsProps extends PinInputProps {
  label: string;
  error?: string;
}

const PinInputs: React.FC<IPinInputsProps> = ({
  autoFocus,
  onChange,
  values,
  label,
  error,
  size = "md",
  mask = false,
  type = "number",
  inputClassName = "text-black",
  placeholder = "",
  inputStyle = { marginLeft: 12 },
  showState = false,
  ...rest
}) => {
  return (
    <div>
      <p className="ml-3 font-medium pb-2 text-black">{label}</p>
      <PinInput
        autoFocus={autoFocus}
        type={type}
        mask={mask}
        size={size}
        placeholder={placeholder}
        inputClassName={inputClassName}
        showState={showState}
        onChange={onChange}
        values={values}
        inputStyle={inputStyle}
        {...rest}
      />

      <p
        className={cn(
          "text-danger pl-2  text-xs ",
          error ? "pt-2 pb-1" : "pt-7"
        )}
      >
        {error}
      </p>
    </div>
  );
};
export default PinInputs;
