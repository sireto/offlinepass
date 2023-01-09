import { Check } from "@app/components/icons/check";
import { Xmark } from "@app/components/icons/xmark";
import cn from "classnames";

type SizeNames = "large" | "medium" | "small" | "mini";

type ColorNames = "danger" | "success";

const sizes: Record<SizeNames, string> = {
  large: "h-6 w-6",
  medium: "h-4 w-4",
  small: "h-3 w-3",
  mini: "h-2 w-2",
};

const colors: Record<ColorNames, string> = {
  success: "text-success",
  danger: "text-danger",
};

interface TextFieldErrorProps extends React.HTMLAttributes<HTMLElement> {
  error?: boolean;
  message: string;
  showIcon?: boolean;
  size?: string;
}

export default function TextFieldError({
  message,
  className,
  error = true,
  showIcon = false,
  size = sizes.medium,
}: TextFieldErrorProps) {
  const color = error ? colors.danger : colors.success;

  return (
    <div className={cn("flex space-x-4 text-xs", color, className)}>
      {showIcon &&
        (error ? <Xmark className={size} /> : <Check className={size} />)}
      <p>{message}</p>
    </div>
  );
}
