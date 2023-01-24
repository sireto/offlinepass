/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { getHostName, hmacSha256 } from "@app/utils/hmac";
import moment from "moment";
import { formTitleConstants } from "@app/constants/formtitle-constants";
import { isEmptyString, isMskValid } from "@app/utils/validationUtils";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { usePassword } from "@app/lib/hooks/use-password";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import { mskErrorsConstants } from "@app/constants/error-constants";
import {
  checkMskValidation,
  decrypt,
  stringTosha256,
  visitorIdentity,
} from "@app/utils/passwordUtils";
import { MskErrorEnums } from "@app/models/enums/errorEnums";
import MuiTextField from "../textfield/MuiTextField";
import TextFieldError from "@app/components/ui/textfield-error";
import { numOfPasswordChangesTP } from "@app/constants/tooltip-constants";
import { toLowerCaseAllElement } from "@app/utils/helperUtils";
import { useGeneratePasswordState } from "@app/lib/hooks/use-generate-passwordstate";
import { useIsMounted } from "@app/lib/hooks/use-is-mounted";
import { useModal } from "../modal-views/context";
import useMskVisibility from "@app/lib/hooks/use-msk-visibility";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import useVisitorId from "@app/lib/hooks/use-visitorId";
import cn from "classnames";
const MuiStyledTextField = styled.div`
  margin-bottom: 20px;
`;

export default function GeneratePasswordView() {
  const { setPasswordHash } = usePassword();
  const isMounted = useIsMounted();
  const { openModal } = useModal();
  const { isMskVisible, setMskVisiblity } = useMskVisibility();
  const dispatch = useAppDispatch();
  const { setVisitorId } = useVisitorId();
  const passwordProvider = useAppSelector(selectPasswordProvider);
  const { generatePswState, setGeneratePswState } = useGeneratePasswordState();
  const mskErrors = [
    MskErrorEnums.LENGTH,
    MskErrorEnums.LOWERCASE,
    MskErrorEnums.SPECIAL_CHARACTER,
    MskErrorEnums.UPPERCASE,
    MskErrorEnums.NUMBER,
  ];
  // const [years, setYears] = useState([2022]);

  const handleGeneratePassword = async () => {
    await hmacSha256(generatePswState).then((passwordhash) => {
      setPasswordHash(passwordhash);
    });
  };

  const isFormFieldsValid =
    !isEmptyString(generatePswState.host) &&
    !isEmptyString(generatePswState.usernameEmail) &&
    isMskValid(generatePswState.msk);

  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab.url === "chrome://newtab/") return "";
    return getHostName(tab.url!);
  };

  const initialPswState = () => {
    if (!isMounted) {
      const passwordProviderUsernameEmailsLength =
        passwordProvider.usernameEmails.length;

      visitorIdentity().then(async (visitorIdentification) => {
        setVisitorId(visitorIdentification);
        if (decrypt(passwordProvider.msk, visitorIdentification) === "") {
          dispatch(
            setPasswordProvider({
              msk: "",
              hosts: passwordProvider.hosts,
              usernameEmails: passwordProvider.usernameEmails,
              hashMsk: "",
              pinHash: "",
            })
          );
        }

        setGeneratePswState({
          msk: decrypt(passwordProvider.msk, visitorIdentification),
          host: await getCurrentTab(),
          usernameEmail:
            passwordProviderUsernameEmailsLength !== 0
              ? passwordProvider.usernameEmails[
                  passwordProviderUsernameEmailsLength - 1
                ]
              : "",
          date: moment(Date.now()).format("YYYY"),
          retries: 0,
        });
      });

      // if (!years.includes(parseInt(moment(Date.now()).format("YYYY")))) {
      //   const yearDuration =
      //     parseInt(moment(Date.now()).format("YYYY")) - years[0];
      //   for (let i: number = 0; i < yearDuration; i++) {
      //     years.push(years[i] + 1);
      //   }
      //   setYears(years);
      // }
    }
  };
  useEffect(() => {
    initialPswState();
    if (isFormFieldsValid) {
      handleGeneratePassword();
    } else {
      setPasswordHash("");
    }
  }, [generatePswState]);
  const generatePasswordFormComponent = (
    <>
      <div>
        <MuiStyledTextField>
          <MuiTextField
            id="input-msk"
            showStoreOption={
              (passwordProvider.hashMsk !==
                stringTosha256(generatePswState.msk) &&
                isMskValid(generatePswState.msk)) ||
              (isEmptyString(passwordProvider.pinHash) &&
                isMskValid(generatePswState.msk))
            }
            label={formTitleConstants.SECURITY_KEY}
            value={generatePswState.msk}
            type={isMskVisible ? "text" : "password"}
            InputProps={{
              style: { fontSize: 14 },
              endAdornment: (
                <InputAdornment position="start">
                  {!isEmptyString(generatePswState.msk) &&
                    (isMskVisible ? (
                      <Eye
                        onClick={() => {
                          setMskVisiblity(false);
                        }}
                        className="h-4 w-4 cursor-pointer"
                      />
                    ) : (
                      <EyeSlash
                        onClick={() => {
                          if (
                            isEmptyString(passwordProvider.msk) ||
                            passwordProvider.hashMsk !==
                              stringTosha256(generatePswState.msk) ||
                            isEmptyString(passwordProvider.pinHash)
                          ) {
                            setMskVisiblity(true);
                          } else {
                            openModal("PINCODE_VIEW", { isSave: false });
                          }
                        }}
                        className="h-4 w-4 cursor-pointer"
                      />
                    ))}
                </InputAdornment>
              ),
            }}
            fullWidth
            error={
              isEmptyString(generatePswState.msk)
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
              openModal("PINCODE_VIEW", { isSave: true });
            }}
          />
        </MuiStyledTextField>

        {!isEmptyString(generatePswState.msk) &&
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
          disabled
          options={passwordProvider.hosts}
          fullWidth
          placeholder="eg: facebook.com"
          showStoreOption={false}
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
                hashMsk: passwordProvider.hashMsk,
                pinHash: passwordProvider.pinHash,
              })
            );
          }}
        />
      </MuiStyledTextField>
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
            <MenuItem
              key={option}
              value={option}
              style={{ fontSize: 12, height: 25 }}
            >
              {option}
            </MenuItem>
          ))}
        </MuiTextField>
      </MuiStyledTextField>
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
    </>
  );

  return (
    <div className="w-full h-full bg-white px-10 ">
      <div className={cn("space-y-2", isFormFieldsValid ? "pt-8" : "pt-2")}>
        <div className="flex flex-col font-Chau_Philomene_One ">
          <p className="font-medium text-3xl text-black">
            Offline<span className="text-brand">Pass</span>
          </p>
          <p className="text-xs">Self Service Password Manager</p>
        </div>

        <div className="pt-4 md:pt-8">{generatePasswordFormComponent}</div>
      </div>
    </div>
  );
}