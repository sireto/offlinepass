import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { hmacSha256 } from "@app/utils/hmac";
import moment from "moment";
import { generatePasswordViewConstants } from "@app/constants/form-view-constants";
import { formTitleConstants } from "@app/constants/formtitle-constants";
import { isEmpty, isMskValid } from "@app/utils/validationUtils";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { useDispatch, useSelector } from "react-redux";
import { usePassword } from "@app/lib/hooks/use-password";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import { mskErrorsConstants } from "@app/constants/error-constants";
import { checkMskValidation } from "@app/utils/passwordUtils";
import { MskErrorEnums } from "@app/models/enums/errorEnums";
import MuiTextField from "../textfield/MuiTextField";
import TextFieldError from "../ui/textfield-error";
import { numOfPasswordChangesTP } from "@app/constants/tooltip-constants";
import { toLowerCaseAllElement } from "@app/utils/helperUtils";
import { useGeneratePasswordState } from "@app/lib/hooks/use-generate-passwordstate";

const MuiStyledTextField = styled.div`
  margin-bottom: 22px;
`;

export default function GeneratePasswordView() {
  const { setPasswordHash } = usePassword();
  const [isMskVisible, setMskVisiblity] = useState(false);
  const dispatch = useDispatch();
  const passwordProvider = useSelector(selectPasswordProvider);
  const {generatePswState,setGeneratePswState} = useGeneratePasswordState();

  const mskErrors = [
    MskErrorEnums.LENGTH,
    MskErrorEnums.LOWERCASE,
    MskErrorEnums.SPECIAL_CHARACTER,
    MskErrorEnums.UPPERCASE,
    MskErrorEnums.NUMBER,
  ];

  const handleGeneratePassword = async () => {
    await hmacSha256(generatePswState).then((passwordhash) => {
      setPasswordHash(passwordhash);
    });
  };

  const isFormFieldsValid =
    !isEmpty(generatePswState.host) &&
    !isEmpty(generatePswState.usernameEmail) &&
    isMskValid(generatePswState.msk);

  useEffect(() => {
    if (isFormFieldsValid) {
      handleGeneratePassword();
    } else {
      setPasswordHash("");
    }
   
  }, [generatePswState]);

  useEffect(()=>{
    setGeneratePswState({
      msk: passwordProvider.msk,
      host: "",
      usernameEmail: "",
      date: moment(Date.now()).format("YYYY"),
      retries: 0,
    })
  },[])
  const generatePasswordFormComponent = (
    <>
      <div>
        <MuiStyledTextField>
          <MuiTextField
            id="input-msk"
            showStoreOption={passwordProvider.msk !== generatePswState.msk}
            label={formTitleConstants.SECURITY_KEY}
            value={generatePswState.msk}
            type={isMskVisible ? "text" : "password"}
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
            onSave={() => {
              dispatch(
                setPasswordProvider({
                  msk: generatePswState.msk,
                  hosts: passwordProvider.hosts,
                  usernameEmails: passwordProvider.usernameEmails,
                })
              );
            }}
          />
        </MuiStyledTextField>

        {!isEmpty(generatePswState.msk) &&
          !isMskValid(generatePswState.msk) && (
            <div className="flex flex-col text-xs text-textfield_label  -mt-2 mb-2 space-y-2">
              <p className=" font-semibold">
                Password Must contain the following :
              </p>
              {mskErrors.map((error) => {
                return (
                  <TextFieldError
                    key={error}
                    showIcon
                    error={!checkMskValidation(error, generatePswState.msk)}
                    message={mskErrorsConstants[error]}
                  />
                );
              })}
            </div>
          )}
      </div>
      <MuiStyledTextField>
        <MuiTextField
          id="host"
          label={formTitleConstants.HOST}
          value={generatePswState.host}
          textfieldTypes="autocomplete"
          options={passwordProvider.hosts}
          fullWidth
          placeholder="eg: facebook.com"
          showStoreOption={
            !toLowerCaseAllElement(passwordProvider.hosts).includes(
              generatePswState.host.toLowerCase()
            )
          }
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              host: event.target.value,
            })
          }
          onSelect={(event) => {
            setGeneratePswState({
              ...generatePswState,
              host: event.target["value"],
            });
          }}
          onSave={() => {
            dispatch(
              setPasswordProvider({
                msk: passwordProvider.msk,
                hosts: [...passwordProvider.hosts, generatePswState.host],
                usernameEmails: passwordProvider.usernameEmails,
              })
            );
          }}
        />
      </MuiStyledTextField>

      <MuiStyledTextField>
        <MuiTextField
          id="username/email"
          label={formTitleConstants.USERNAME_EMAIL}
          value={generatePswState.usernameEmail}
          textfieldTypes="autocomplete"
          options={passwordProvider.usernameEmails}
          onSelect={(event) => {
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.target["value"],
            });
          }}
          showStoreOption={
            !toLowerCaseAllElement(passwordProvider.usernameEmails).includes(
              generatePswState.usernameEmail.toLowerCase()
            )
          }
          fullWidth
          placeholder="eg: abc or abc@example.com"
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.currentTarget.value,
            })
          }
          onSave={() => {
            dispatch(
              setPasswordProvider({
                msk: passwordProvider.msk,
                hosts: passwordProvider.hosts,
                usernameEmails: [
                  ...passwordProvider.usernameEmails,
                  generatePswState.usernameEmail,
                ],
              })
            );
          }}
        />
      </MuiStyledTextField>

      <div className="flex flex-col md:flex-row md:space-x-10 justify-between">
        <div className="md:w-1/2">
          <MuiStyledTextField>
            <MuiTextField
              id="date"
              label={formTitleConstants.YEAR}
              type="number"
              select
              value={generatePswState.date}
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
            </MuiTextField>
          </MuiStyledTextField>
        </div>

        <div className="md:w-1/2">
          <MuiStyledTextField>
            <MuiTextField
              id="retries"
              label={`${formTitleConstants.RETRIES} ${generatePswState.date}`}
              type="number"
              value={generatePswState.retries}
              toolTipTitle={numOfPasswordChangesTP}
              showTooltip
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
    <div className="w-full h-full bg-white  sm:px-2 md:px-10 lg:px-6 xl:px-24 2xl:px-32 3xl:px-44">
      <div className="pt-16 space-y-8">
        <div className="flex flex-col space-y-2 ">
          <p className="font-bold text-xl md:text-3xl text-black">
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
