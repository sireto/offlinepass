import { isEmptyString } from "@app/utils/validationUtils";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import React, { Ref } from "react";
import cn from "classnames";
import Autocomplete from "@mui/material/Autocomplete";
import MuiTooltip from "@app/components/ui/tooltip/mui-tooltip";

type TextFieldTypes = "normal" | "autocomplete";

type ShapeNames = "pill";

type ColorNames = "lightBlue";

const shapes: Record<ShapeNames, string> = {
  pill: "inputRounded",
};

const colors: Record<ColorNames, string> = {
  lightBlue: "inputBgLightGray",
};

interface MuiTextFieldProps extends Omit<OutlinedTextFieldProps, "variant"> {
  shape?: string;
  showStoreOption?: boolean;
  toolTipTitle?: string;
  showTooltip?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  bgColor?: string;
  textfieldTypes?: TextFieldTypes;
  options?: string[];
}

const MuiTextField: React.FC<MuiTextFieldProps> = ({
  id,
  value,
  label,
  type,
  className,
  onSave,
  InputProps,
  placeholder,
  error,
  select,
  onChange,
  onSelect,
  children,
  autoComplete,
  showStoreOption = false,
  fullWidth = true,
  shape = shapes.pill,
  bgColor = colors.lightBlue,
  textfieldTypes = "normal",
  showTooltip = false,
  options = [],
  disabled = false,
  toolTipTitle = "",
  ...muiTextFieldProps
}) => {
  const getTextFieldTitle = (
    <div className="flex  justify-between mb-2 space-x-4 items-center text-xs md:text-sm text-textfield_label font-medium">
      <div className="flex items-center font-medium">
        {label}{" "}
        {showTooltip && <MuiTooltip title={toolTipTitle} className="ml-2" />}
      </div>

      {
        //@ts-ignore
        showStoreOption && !isEmptyString(value) && (
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

  const getTextfield = () => {
    switch (textfieldTypes) {
      case "normal":
        return (
          <TextField
            id={id}
            value={value}
            className={cn(shape, bgColor, className)}
            type={type}
            select={select}
            variant="outlined"
            disabled={disabled}
            InputProps={InputProps}
            fullWidth={fullWidth}
            error={error}
            onChange={onChange}
          >
            {children}
          </TextField>
        );

      case "autocomplete":
        return (
          <Autocomplete
            id={id}
            options={options}
            getOptionLabel={(option: string) => option}
            autoComplete
            fullWidth
            freeSolo
            includeInputInList
            renderInput={(params) => {
              return (
                <TextField
                  value={value}
                  {...params}
                  ref={params.InputProps.ref}
                  placeholder={placeholder}
                  className={cn(shape, bgColor, className)}
                  type={type}
                  variant="outlined"
                  InputProps={InputProps}
                  fullWidth={fullWidth}
                  error={error}
                  onSelect={onSelect}
                  onChange={onChange}
                />
              );
            }}
          />
        );
    }
  };

  return (
    <>
      {label !== "" && getTextFieldTitle}
      {getTextfield()}
    </>
  );
};

export default MuiTextField;
