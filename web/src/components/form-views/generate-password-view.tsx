import React, { useEffect, useState } from "react";
import {
  InputAdornment,
  MenuItem,
  TextField,
  TextFieldProps,
} from "@mui/material";
import styled from "@emotion/styled";
import Button from "@app/components/ui/button/button";
import { hmacSha256 } from "@app/utils/hmac";
import moment from "moment";
import { generatePasswordViewConstants } from "@app/constants/form-view-constants";
import { showSuccessModal } from "@app/lib/modals/showModals";
import { useFormStatus } from "@app/lib/hooks/use-form-status";
import { FormContent } from "@app/models/enums/formEnums";
import { hideString } from "@app/utils/stringUtils";
import { Copy } from "../icons/copy";
import { isEmpty, isMskValid } from "@app/utils/validationUtils";
import { Eye } from "../icons/eye";
import { EyeSlash } from "../icons/eyeslash";
import Dropdown from "../year_dropdown";
import { GeneratePswStateDtos } from "@app/models/dtos/generatepsw";
import { useCopyToClipboard } from "@app/lib/hooks/ use-copy-to-clipboard";
import { toast } from "react-toastify";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";

const MuiStyledTextField = styled.div`
  height: 55px;
  border-radius: 12px;
  margin-bottom: 22px;
  background-color: #f6f8fb;
`;

export default function GeneratePasswordView() {
  const [passwordHash, setPasswordHash] = useState("");
  const [isMskVisible, setMskVisiblity] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const breakpoint = useBreakpoint();
  const [generatePswState, setGeneratePswState] =
    useState<GeneratePswStateDtos>({
      msk: "",
      host: "",
      usernameEmail: "",
      date: moment(Date.now()).format("YYYY"),
      retries: 0,
    });
  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyPassword = () => {
    copyToClipboard(passwordHash!);
    toast.success(`Copied!`, {
      autoClose: 1000,
    });
  };
  useEffect(() => {
    if (
      !isEmpty(generatePswState.host) &&
      !isEmpty(generatePswState.usernameEmail) &&
      isMskValid(generatePswState.msk)
    ) {
      handleGeneratePassword();
    } else {
      setPasswordHash("");
    }
  }, [generatePswState]);

  const handleGeneratePassword = async () => {
    await hmacSha256(generatePswState).then((passwordhash) => {
      setPasswordHash(passwordhash);
    });
  };

  const textfieldTitle = (label: string, generatePswStateValue: string) => (
    <div className="flex justify-between mb-2 space-x-4 items-center text-xs md:text-sm text-textfield_label font-medium">
      <p className="font-medium ">{label}</p>
      {/* {!isEmpty(generatePswStateValue) && (
        <div className="flex items-center space-x-4">
          <p className=" text-red-400">Do you want to save?</p>
          <button className="px-5 py-2 font-semibold rounded-lg bg-red-400 text-white">
            Yes
          </button>
        </div>
      )} */}
    </div>
  );

  const generatedPassword = (
    <div className="flex justify-between items-center">
      <div className="flex items-center px-10 bg-red-100 w-full space-x-3">
        <p className=" font-bold text-green-400">
          Your password has been generated:{" "}
        </p>
        <p className="text-center font-bold px-3 my-2 text-red-800 py-1 bg-slate-100 rounded-lg">
          {passwordHash.substring(0, 2) +
            hideString(passwordHash.substring(2), isPasswordVisible)}
        </p>
        {isPasswordVisible ? (
          <Eye
            onClick={() => {
              setPasswordVisibility(false);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        ) : (
          <EyeSlash
            onClick={() => {
              setPasswordVisibility(true);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        )}
      </div>
      <button onClick={handleCopyPassword} className="px-3 py-3 bg-white">
        <Copy className="h-6 w-6" />
      </button>
    </div>
  );

  const generatePasswordFormComponent = (
    <>
      {textfieldTitle(FormContent.SECURITY_KEY, generatePswState.msk)}
      <MuiStyledTextField>
        <TextField
          id="input-msk"
          value={generatePswState.msk}
          className="inputRounded"
          type={isMskVisible ? "text" : "password"}
          helperText={
            !isEmpty(generatePswState.msk) && !isMskValid(generatePswState.msk)
              ? "Security key must contain lowercase letter,uppercase letter,number,special character and at least 8 characters"
              : ""
          }
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {isMskVisible ? (
                  <Eye
                    onClick={() => {
                      setMskVisiblity(false);
                    }}
                    className="h-6 w-6 cursor-pointer"
                  />
                ) : (
                  <EyeSlash
                    onClick={() => {
                      setMskVisiblity(true);
                    }}
                    className="h-6 w-6 cursor-pointer"
                  />
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
          error={
            isEmpty(generatePswState.msk)
              ? false
              : !isMskValid(generatePswState.msk)
          }
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              msk: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      {textfieldTitle(FormContent.HOST, generatePswState.host)}
      <MuiStyledTextField>
        <TextField
          id="host"
          className="inputRounded"
          value={generatePswState.host}
          placeholder="eg. facebook.com"
          variant="outlined"
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              host: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      {textfieldTitle(
        FormContent.USERNAME_EMAIL,
        generatePswState.usernameEmail
      )}
      <MuiStyledTextField>
        <TextField
          id="username/email"
          className="inputRounded"
          value={generatePswState.usernameEmail}
          placeholder="eg. abc or abc@example.com"
          variant="outlined"
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <div className="flex flex-col md:flex-row md:space-x-10 justify-between">
        <div className="md:w-1/2">
          {textfieldTitle(FormContent.YEAR, generatePswState.usernameEmail)}
          <MuiStyledTextField>
            <TextField
              id="retries"
              className="inputRounded"
              type="number"
              select
              value={generatePswState.retries}
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setGeneratePswState({
                  ...generatePswState,
                  retries: parseInt(event.currentTarget.value),
                })
              }
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            >
              {[2022, 2023].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </MuiStyledTextField>
        </div>

        <div className="md:w-1/2">
          {textfieldTitle(FormContent.RETRIES, generatePswState.usernameEmail)}
          <MuiStyledTextField>
            <TextField
              id="retries"
              className="inputRounded"
              type="number"
              value={generatePswState.retries}
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setGeneratePswState({
                  ...generatePswState,
                  retries: parseInt(event.currentTarget.value),
                })
              }
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </MuiStyledTextField>
        </div>
      </div>
    </>
  );
  return (
    <div className="w-full h-full bg-white sm:px-2 md:px-10 2xl:px-24">
      <div className="py-16 space-y-8">
        <div className="flex flex-col space-y-2 ">
          <p className="font-bold text-xl md:text-3xl">
            {generatePasswordViewConstants.title}
          </p>
          <p className="text-xs md:text-sm text-lightGray font-normal">
            {generatePasswordViewConstants.description}
          </p>
        </div>

        <div className="pt-4 md:pt-8">{generatePasswordFormComponent}</div>
      </div>
    </div>
  );
}
