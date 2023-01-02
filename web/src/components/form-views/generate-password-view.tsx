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
import {
  isContainLowercase,
  isContainNumber,
  isContainSpecialCharacter,
  isContainUppercase,
  isEmpty,
  isMinimumCharacter,
  isMskValid,
} from "@app/utils/validationUtils";
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
import { Check } from "../icons/check";
import { Xmark } from "../icons/xmark";
import { ErrorPasswordContentEnums } from "@app/models/enums/errorPasswordContentEnums";
import ErrorPassword from "./errorPassword";

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
            hosts: passwordProvider.hosts,
            usernameEmails: passwordProvider.usernameEmails,
          })
        );
        break;
      case FormContent.HOST:
        dispatch(
          setPasswordProvider({
            msk: passwordProvider.msk,
            hosts: [
              ...passwordProvider.hosts,
              generatePswState.host.toLowerCase(),
            ],
            usernameEmails: passwordProvider.usernameEmails,
          })
        );
        break;
      case FormContent.USERNAME_EMAIL:
        dispatch(
          setPasswordProvider({
            msk: passwordProvider.msk,
            hosts: passwordProvider.hosts,
            usernameEmails: [
              ...passwordProvider.usernameEmails,
              generatePswState.usernameEmail.toLowerCase(),
            ],
          })
        );
        break;
    }
  };

  const passwordErrorhandler = (
    errorPasswordContent: string,
    isPasswordContentmatch: boolean
  ) => {
    <div
      className={`flex space-x-4 text-sm ${
        isPasswordContentmatch ? "text-green-600" : "text-red-600"
      }`}
    >
      {isPasswordContentmatch ? (
        <Check className="h-5 w-5" />
      ) : (
        <Xmark className="h-5 w-5" />
      )}
      {errorPasswordContent}
    </div>;
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
  const isPasswordContentMatch = (key: string) => {
    switch (key) {
      case "LOWERCASE":
        return isContainLowercase(generatePswState.msk);
      case "UPPERCASE":
        return isContainUppercase(generatePswState.msk);
      case "NUMBER":
        return isContainNumber(generatePswState.msk);
      case "SPECIAL_CHARACTER":
        return isContainSpecialCharacter(generatePswState.msk);
      case "LENGTH":
        return isMinimumCharacter(generatePswState.msk);
      default:
        return false;
    }
  };

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
            <div className="flex flex-col text-xs text-textfield_label  -mt-2 mb-2 space-y-2">
              <p className=" font-semibold">
                Password Must contain the following :
              </p>
              {Object.keys(ErrorPasswordContentEnums).map((key) => {
                return (
                  <ErrorPassword
                    key={key}
                    isPasswordContentMatch={isPasswordContentMatch(key)}
                    errorPasswordContent={ErrorPasswordContentEnums[key]}
                  />
                );
              })}

              {/* Security key must contain lowercase letter,uppercase
              letter,number,special character and at least 8 characters */}
            </div>
          )}
      </div>
      {textfieldTitle(
        FormContent.HOST,
        generatePswState.host,
        !passwordProvider.hosts.includes(generatePswState.host.toLowerCase())
      )}
      <MuiStyledTextField>
        <Autocomplete
          id="host"
          options={passwordProvider.hosts}
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
        !passwordProvider.usernameEmails.includes(
          generatePswState.usernameEmail.toLowerCase()
        )
      )}
      <MuiStyledTextField>
        <Autocomplete
          id="username/email"
          options={passwordProvider.usernameEmails}
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
