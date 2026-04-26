import { isEmptyString } from "@app/utils/validationUtils";
import TextField, {
  type OutlinedTextFieldProps,
} from "@mui/material/TextField";
import React from "react";
import cn from "classnames";
import Autocomplete, {
  type AutocompleteRenderOptionState,
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

const shapes: Record<ShapeNames, string> = { pill: "inputRounded" };
const colors: Record<ColorNames, string> = {
  lightBlue: "inputBgLightGray",
  white: "white",
};

const MuiStyledTextField = styled.div``;

export const inputPropsStyle = {
  fontSize: 13,
  borderRadius: 8,
  height: 40,
};

const customRenderOption = (
  props: React.HTMLAttributes<HTMLLIElement> & { key?: React.Key },
  option: string
) => {
  const { key, ...rest } = props;
  return (
    <li
      key={key}
      {...rest}
      style={{
        fontSize: inputPropsStyle.fontSize,
        height: inputPropsStyle.height,
      }}
    >
      {option}
    </li>
  );
};

type InputSlotProps = NonNullable<
  NonNullable<OutlinedTextFieldProps["slotProps"]>["input"]
>;
type HtmlInputSlotProps = NonNullable<
  NonNullable<OutlinedTextFieldProps["slotProps"]>["htmlInput"]
>;

interface MuiTextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant" | "slotProps"> {
  shape?: string;
  showStoreOption?: boolean;
  toolTipTitle?: string;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  bgColor?: string;
  textfieldTypes?: TextFieldTypes;
  options?: string[];
  isSave?: boolean;
  inputSlotProps?: InputSlotProps;
  htmlInputSlotProps?: HtmlInputSlotProps;
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
  inputSlotProps,
  htmlInputSlotProps,
  options = [],
  disabled = false,
  toolTipTitle = "",
}) => {
  const slotProps = {
    input: { style: inputPropsStyle, ...(inputSlotProps ?? {}) } as InputSlotProps,
    ...(htmlInputSlotProps ? { htmlInput: htmlInputSlotProps } : {}),
  };

  const getTextFieldTitle = (
    <div className="flex justify-between mb-1.5 items-center text-xs text-textfield_label font-medium">
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        {showStoreOption && toolTipTitle && (
          <MuiTooltip title={toolTipTitle} />
        )}
      </div>
      {showStoreOption &&
        isSave &&
        !isEmptyString(typeof value === "string" ? value : "") && (
          <button
            type="button"
            onClick={onSave}
            className="text-[10px] font-semibold uppercase tracking-wider text-buttonColor hover:text-brand transition-colors"
          >
            + Save
          </button>
        )}
    </div>
  );

  const stringValue = typeof value === "string" ? value : "";

  const dispatchSyntheticChange = (newValue: string) => {
    if (!onChange) return;
    const synthetic = {
      target: { id, value: newValue },
      currentTarget: { id, value: newValue },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(synthetic);
  };

  const getTextfield = () => {
    if (textfieldTypes === "autocomplete") {
      return (
        <Autocomplete
          id={id}
          options={options}
          value={stringValue}
          inputValue={stringValue}
          onInputChange={(_event, newValue) =>
            dispatchSyntheticChange(newValue)
          }
          onChange={(_event, newValue) =>
            dispatchSyntheticChange(typeof newValue === "string" ? newValue : "")
          }
          getOptionLabel={(option) =>
            typeof option === "string" ? option : ""
          }
          autoComplete
          fullWidth
          freeSolo
          includeInputInList
          selectOnFocus
          handleHomeEndKeys
          renderOption={renderOption}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              className={cn(shape, bgColor, className)}
              type={type}
              variant="outlined"
              fullWidth={fullWidth}
              error={error}
              onSelect={onSelect}
              slotProps={{
                ...params.slotProps,
                input: {
                  ...(params.slotProps?.input ?? {}),
                  style: inputPropsStyle,
                  ...(inputSlotProps ?? {}),
                },
              }}
            />
          )}
        />
      );
    }
    return (
      <TextField
        id={id}
        value={value}
        className={cn(shape, bgColor, className)}
        type={type}
        select={select}
        variant="outlined"
        disabled={disabled}
        slotProps={slotProps}
        fullWidth={fullWidth}
        error={error}
        onChange={onChange}
      >
        {children}
      </TextField>
    );
  };

  return (
    <>
      {getTextFieldTitle}
      <MuiStyledTextField className="w-full">
        {getTextfield()}
      </MuiStyledTextField>
    </>
  );
};

export default MuiTextField;
