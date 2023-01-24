import { isEmptyString } from "@app/utils/validationUtils";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import React, { Ref } from "react";
import cn from "classnames";
import Autocomplete from "@mui/material/Autocomplete";
import MuiTooltip from "@app/components/ui/tooltip/mui-tooltip";
import styled from "@emotion/styled";
import useFormContext from "@app/components/form-views/form-context";
import Button from "@app/components/ui/button/button";

type TextFieldTypes = "normal" | "autocomplete";

type ShapeNames = "pill";

type ColorNames = "lightBlue";
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
};

const MuiStyledTextField = styled.div`
  margin-bottom: 22px;
`;

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
  // const { generatePswState, setGeneratePswState } = useGeneratePasswordState();
  const { setFormContext, formContext } = useFormContext();
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
            <Button
              onClick={onSave}
              color="success"
              shape="rounded"
              size="mini"
            >
              Save
            </Button>
          </div>
        )
      }
    </div>
  );

  //@ts-ignore
  const passwordState: passwordState = typeof id === "string" && id;
  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    setFormContext({
      ...formContext,
      generatePswState: {
        ...formContext.generatePswState,
        [passwordState]: select
          ? event.target["value"]
          : event.currentTarget["value"],
      },
    });

  const handleOnSelect = (event: React.SyntheticEvent<HTMLDivElement, Event>) =>
    setFormContext({
      ...formContext,
      generatePswState: {
        ...formContext.generatePswState,
        [passwordState]: event.target["value"],
      },
    });

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
            onChange={handleOnChange}
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
                  onSelect={handleOnSelect}
                  onChange={handleOnChange}
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
      <MuiStyledTextField>{getTextfield()}</MuiStyledTextField>
      {/* {label === formTitleConstants.SECURITY_KEY && getGeneratePassword()} */}
    </>
  );
};

export default MuiTextField;
