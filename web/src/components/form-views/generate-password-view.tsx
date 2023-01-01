import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { usePassword } from "@app/lib/hooks/use-password";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { setPasswordProvider } from "@app/store/password/passwordSlice";

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
  const passwordProvider = useSelector(selectPasswordProvider);
  const [generatePswState, setGeneratePswState] = useState({
    msk: passwordProvider.msk,
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

  const handleStore = (label: FormContent) => {
    switch (label) {
      case FormContent.SECURITY_KEY:
        dispatch(
          setPasswordProvider({
            msk: generatePswState.msk,
            host: passwordProvider.host,
            usernameEmail: passwordProvider.usernameEmail,
          })
        );
        break;
      case FormContent.HOST:
        dispatch(
          setPasswordProvider({
            msk: passwordProvider.msk,
            host: [
              ...passwordProvider.host,
              generatePswState.host.toLowerCase(),
            ],
            usernameEmail: passwordProvider.usernameEmail,
          })
        );
        break;
      case FormContent.USERNAME_EMAIL:
        dispatch(
          setPasswordProvider({
            msk: passwordProvider.msk,
            host: passwordProvider.host,
            usernameEmail: [
              ...passwordProvider.usernameEmail,
              generatePswState.usernameEmail.toLowerCase(),
            ],
          })
        );
        break;
    }
  };

  const textfieldTitle = (
    label: FormContent,
    generatePswStateValue: string,
    showStoreOption: boolean = true
  ) => (
    <div className="flex justify-between mb-2 space-x-4 items-center text-xs md:text-sm text-textfield_label font-medium">
      <p className="font-medium ">{label}</p>
      {showStoreOption && !isEmpty(generatePswStateValue) && (
        <div className="flex items-center space-x-4 text-xs">
          <p className=" text-red-400 font-normal">Do you want to save?</p>
          <button
            onClick={() => {
              handleStore(label);
            }}
            className="px-3 py-[5px] font-semibold rounded-lg bg-red-400  text-white"
          >
            Yes
          </button>
        </div>
      )}
    </div>
  );

  const generatePasswordFormComponent = (
    <>
      {textfieldTitle(
        FormContent.SECURITY_KEY,
        generatePswState.msk,
        passwordProvider.msk !== generatePswState.msk
      )}

      <div>
        <MuiStyledTextField>
          <TextField
            id="input-msk"
            value={generatePswState.msk}
            className="inputRounded"
            type={isMskVisible ? "text" : "password"}
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
        {!isEmpty(generatePswState.msk) &&
          !isMskValid(generatePswState.msk) && (
            <p className="text-xs text-red-700 -mt-4 mb-2">
              Security key must contain lowercase letter,uppercase
              letter,number,special character and at least 8 characters
            </p>
          )}
      </div>
      {textfieldTitle(
        FormContent.HOST,
        generatePswState.host,
        !passwordProvider.host.includes(generatePswState.host.toLowerCase())
      )}
      <MuiStyledTextField>
        <Autocomplete
          id="host"
          options={passwordProvider.host}
          getOptionLabel={(option: string) => option}
          autoComplete
          fullWidth
          freeSolo
          includeInputInList
          renderInput={(params) => (
            <TextField
              {...params}
              className="inputRounded"
              value={generatePswState.host}
              fullWidth
              placeholder="eg: facebook.com"
              variant="outlined"
              onChange={(event) =>
                setGeneratePswState({
                  ...generatePswState,
                  host: event.currentTarget.value,
                })
              }
            />
          )}
        />
      </MuiStyledTextField>
      {textfieldTitle(
        FormContent.USERNAME_EMAIL,
        generatePswState.usernameEmail,
        !passwordProvider.usernameEmail.includes(
          generatePswState.usernameEmail.toLowerCase()
        )
      )}
      <MuiStyledTextField>
        <Autocomplete
          id="username/email"
          options={passwordProvider.usernameEmail}
          getOptionLabel={(option: string) => option}
          autoComplete
          fullWidth
          freeSolo
          includeInputInList
          renderInput={(params) => (
            <TextField
              {...params}
              className="inputRounded"
              value={generatePswState.usernameEmail}
              fullWidth
              placeholder="eg: abc or abc@example.com"
              variant="outlined"
              onChange={(event) =>
                setGeneratePswState({
                  ...generatePswState,
                  usernameEmail: event.currentTarget.value,
                })
              }
            />
          )}
        />
      </MuiStyledTextField>
      <div className="flex flex-col md:flex-row md:space-x-10 justify-between">
        <div className="md:w-1/2">
          {textfieldTitle(FormContent.YEAR, generatePswState.date, false)}
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
          {textfieldTitle(
            FormContent.RETRIES,
            generatePswState.retries.toString(),
            false
          )}

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
