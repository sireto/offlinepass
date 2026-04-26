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
  size = "sm",
  mask = false,
  type = "number",
  inputClassName = "text-black",
  placeholder = "",
  inputStyle = { marginLeft: 2 },
  showState = false,
  ...rest
}) => {
  return (
    <div>
      <p className="font-medium pb-3 text-sm text-black">{label}</p>
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
          "text-danger  text-[10px] ",
          error ? "pt-3" : "pt-[27px]"
        )}
      >
        {error}
      </p>
    </div>
  );
};
export default PinInputs;
