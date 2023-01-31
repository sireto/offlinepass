import { isEmptyString } from "@app/utils/validationUtils";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import React from "react";
import cn from "classnames";
import Autocomplete from "@mui/material/Autocomplete";
import MuiTooltip from "@app/components/ui/tooltip/mui-tooltip";
import styled from "@emotion/styled";
import Button from "@app/components/ui/button/button";

type TextFieldTypes = "normal" | "autocomplete";

type ShapeNames = "pill";

type ColorNames = "lightBlue" | "white";
export type passwordState =
  | "msk"
  | "host"
  | "usernameEmail"
  | "date"
  | "retries";

const shapes: Record<ShapeNames, string> = {
  pill: "inputRounded",
};

const colors: Record<ColorNames, string> = {
  lightBlue: "inputBgLightGray",
  white: "white",
};

const MuiStyledTextField = styled.div`
  margin-bottom: 14px;
`;

export const inputPropsStyle = {
  fontSize: 12,
  borderRadius: 4,
  height: 40,
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
  showTitleToolTip?: boolean;
  isSave?: boolean;
}

const MuiTextField: React.FC<MuiTextFieldProps> = ({
  id,
  value,
  label,
  type,
  className,
  onSave,
  placeholder,
  error,
  select,
  onSelect,
  onChange,
  children,
  showStoreOption = true,
  fullWidth = true,
  shape = shapes.pill,
  bgColor = colors.white,
  textfieldTypes = "normal",
  showTooltip = false,
  isSave = false,
  InputProps = { style: inputPropsStyle },
  options = [],
  disabled = false,
  toolTipTitle = "",
}) => {
  const getTextFieldTitle = (
    <div className="flex  justify-between pb-2 items-center lg:text-sm text-xs text-textfield_label font-medium">
      <div className="flex items-center font-medium">
        {label}{" "}
        {showTooltip && <MuiTooltip title={toolTipTitle} className="ml-2" />}
      </div>
      {showStoreOption && (
        <div className="flex items-center space-x-1 text-[10px]">
          <p className=" text-lightGray">Do you want to save?</p>

          <MuiTooltip title={toolTipTitle} className="ml-2" />
        </div>
      )}
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
            value={typeof value === "string" ? value : undefined}
            getOptionLabel={(option: string) => option}
            autoComplete
            fullWidth
            freeSolo
            includeInputInList
            renderOption={(props, option) => {
              return (
                <span
                  {...props}
                  style={{
                    fontSize: 12,
                    color: "brand",
                  }}
                >
                  {option}
                </span>
              );
            }}
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
  //  TODO generate password using seedwords
  // const getGeneratePassword = () => {
  //   return (
  //     <AnchorLink
  //       href={"/msk/generate"}
  //       className="flex justify-end lg:text-sm text-xs text-textfield_label pr-2 pt-2"
  //     >
  //       Generate Password
  //     </AnchorLink>
  //   );
  // };

  return (
    <>
      {getTextFieldTitle}
      <MuiStyledTextField className="w-full flex space-x-2 items-center justify-between ">
        {getTextfield()}
        {showStoreOption && (
          <Button
            onClick={onSave}
            disabled={!isSave}
            className={cn(
              "text-xs rounded-md h-full  text-white py-2",
              isSave && !isEmptyString(typeof value === "string" ? value : "")
                ? "bg-buttonColor hover:bg-brand"
                : " bg-gray-200 cursor-not-allowed"
            )}
          >
            Yes
          </Button>
        )}
      </MuiStyledTextField>
      {/* {label === formTitleConstants.SECURITY_KEY && getGeneratePassword()} */}
    </>
  );
};

export default MuiTextField;
