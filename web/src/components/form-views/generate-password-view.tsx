import React, { useEffect, useState } from "react";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { hmacSha256 } from "@app/utils/hmac";
import moment from "moment";
import { generatePasswordViewConstants } from "@app/constants/form-view-constants";
import { FormContent } from "@app/models/enums/formEnums";
import { isEmpty, isMskValid } from "@app/utils/validationUtils";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { GeneratePswStateDtos } from "@app/models/dtos/generatepsw";
import { hideString } from "@app/utils/stringUtils";
import { useCopyToClipboard } from "@app/lib/hooks/ use-copy-to-clipboard";
import { toast } from "react-toastify";
import { Copy } from "../icons/copy";
import { usePassword } from "@app/lib/hooks/use-password";

const MuiStyledTextField = styled.div`
  height: 55px;
  border-radius: 12px;
  margin-bottom: 22px;
  background-color: #f6f8fb;
`;

export default function GeneratePasswordView() {
  const { passwordHash, setPasswordHash } = usePassword();
  const [isMskVisible, setMskVisiblity] = useState(false);
  const dispatch = useDispatch();
  const [generatePswState, setGeneratePswState] =
    useState<GeneratePswStateDtos>({
      msk: "",
      host: "",
      usernameEmail: "",
      date: moment(Date.now()).format("YYYY"),
      retries: 0,
    });

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

  const onValuesSave = () => {};

  const textfieldTitle = (
    label: string,
    generatePswStateValue: string,
    showStoreOption: boolean = true
  ) => (
    <div className="flex justify-between mb-2 space-x-4 items-center text-xs md:text-sm text-textfield_label font-medium">
      <p className="font-medium ">{label}</p>
      {showStoreOption && !isEmpty(generatePswStateValue) && (
        <div className="flex items-center space-x-4 text-xs">
          <p className=" text-red-400 font-normal">Do you want to save?</p>
          <button className="px-3 py-[5px] font-semibold rounded-lg bg-red-400  text-white">
            Yes
          </button>
        </div>
      )}
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
              id="date"
              className="inputRounded"
              type="number"
              select
              value={generatePswState.date}
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setGeneratePswState({
                  ...generatePswState,
                  date: event.target.value,
                })
              }
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            >
              {[2022, 2023, 2024].map((option) => (
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
    <div className="w-full h-full bg-white sm:px-2 md:px-10 lg:px-6 xl:px-24 2xl:px-32 3xl:px-44">
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
