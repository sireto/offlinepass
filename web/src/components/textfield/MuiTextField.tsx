import { isEmpty } from "@app/utils/validationUtils";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import React, { Ref } from "react";
import cn from "classnames";
import Autocomplete from "@mui/material/Autocomplete";

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
  error,
  select,
  onChange,
  children,
  showStoreOption = false,
  fullWidth = true,
  shape = shapes.pill,
  bgColor = colors.lightBlue,
  textfieldTypes = "normal",
  options = [],
  ...muiTextFieldProps
}) => {
  const getTextFieldTitle = (
    <div className="flex  justify-between mb-2 space-x-4 items-center text-xs md:text-sm text-textfield_label font-medium">
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
                  className={cn(shape, bgColor, className)}
                  type={type}
                  variant="outlined"
                  InputProps={InputProps}
                  fullWidth={fullWidth}
                  error={error}
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
      {getTextFieldTitle}
      {getTextfield()}
    </>
  );
};

export default MuiTextField;
