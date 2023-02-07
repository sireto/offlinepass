import { PinInput } from "react-input-pin-code";
import { PinInputProps } from "react-input-pin-code/dist/types/PinInput";
import cn from "classnames";

// type SizeNames = "large" | "medium" | "small" | "mini";
// type size = "lg" | "md" | "sm" | "xs";
// const sizes: Record<SizeNames, size> = {
//   large: "lg",
//   medium: "md",
//   small: "sm",
//   mini: "xs",
// };

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
