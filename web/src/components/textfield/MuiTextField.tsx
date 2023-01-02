import { isEmpty } from "@app/utils/validationUtils";
import TextField, {
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from "@mui/material/TextField";
import React from "react";
import cn from "classnames";

type ShapeNames = "pill";

const shapes: Record<ShapeNames, string> = {
  pill: "inputRounded",
};

interface MuiTextFieldProps extends Omit<OutlinedTextFieldProps, "variant"> {
  shape?: string;
  showStoreOption?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const MuiTextField: React.FC<MuiTextFieldProps> = ({
  value,
  label,
  type,
  className,
  onSave,
  InputProps,
  error,
  onChange,
  showStoreOption = true,
  fullWidth = true,
  shape = shapes.pill,
  ...muiTextFieldProps
}) => {
  const getTextFieldTitle = (
    <div className="flex justify-between mb-2 space-x-4 items-center text-xs md:text-sm text-textfield_label font-medium">
      <p className="font-medium ">{label}</p>
      {
        //@ts-ignore
        showStoreOption && !isEmpty(value) && (
          <div className="flex items-center space-x-4 text-xs">
            <p className=" text-red-400 font-normal">Do you want to save?</p>
            <button
              onClick={onSave}
              className="px-3 py-[5px] font-semibold rounded-lg bg-red-400  text-white"
            >
              Yes
            </button>
          </div>
        )
      }
    </div>
  );
  return (
    <>
      {getTextFieldTitle}
      <TextField
        id="input-msk"
        value={value}
        className={cn(shape, className)}
        type={type}
        variant="outlined"
        InputProps={InputProps}
        fullWidth={fullWidth}
        error={error}
        onChange={onChange}
      />
    </>
  );
};

export default MuiTextField;
