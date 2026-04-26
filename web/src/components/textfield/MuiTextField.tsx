import { isEmptyString } from "@app/utils/validationUtils";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import React from "react";
import cn from "classnames";
import Autocomplete, {
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import MuiTooltip from "@app/components/ui/tooltip/mui-tooltip";
import styled from "@emotion/styled";

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
  margin-bottom: 18px;
`;

export const inputPropsStyle = {
  fontSize: 14,
  borderRadius: 8,
  height: 44,
};

const customRenderOption = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: string
) => {
  return (
    <span
      {...props}
      style={{
        fontSize: inputPropsStyle.fontSize,
        color: "brand",
        height: inputPropsStyle.height,
      }}
    >
      {option}
    </span>
  );
};

interface MuiTextFieldProps extends Omit<OutlinedTextFieldProps, "variant"> {
  shape?: string;
  showStoreOption?: boolean;
  toolTipTitle?: string;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  bgColor?: string;
  textfieldTypes?: TextFieldTypes;
  options?: string[];
  isSave?: boolean;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: string,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
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
  renderOption = customRenderOption,
  showStoreOption = true,
  fullWidth = true,
  shape = shapes.pill,
  bgColor = colors.white,
  textfieldTypes = "normal",
  isSave = false,
  InputProps = { style: inputPropsStyle },
  options = [],
  disabled = false,
  toolTipTitle = "",
}) => {
  const getTextFieldTitle = (
    <div className="flex justify-between pb-2 items-center text-sm text-textfield_label font-medium">
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        {showStoreOption && toolTipTitle && (
          <MuiTooltip title={toolTipTitle} />
        )}
      </div>
      {showStoreOption && isSave && !isEmptyString(typeof value === "string" ? value : "") && (
        <button
          type="button"
          onClick={onSave}
          className="text-[11px] font-semibold uppercase tracking-wider text-buttonColor hover:text-brand transition-colors"
        >
          + Save
        </button>
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
            renderOption={renderOption}
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
      <MuiStyledTextField className="w-full">{getTextfield()}</MuiStyledTextField>
    </>
  );
};

export default MuiTextField;
