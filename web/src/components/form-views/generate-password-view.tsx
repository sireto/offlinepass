import React, { useEffect } from "react";
import { InputAdornment, MenuItem } from "@mui/material";
import { getHostName, hmacSha256 } from "@app/utils/hmac";
import cn from "classnames";
import {
  formIds,
  generatePasswordViewConstants,
} from "@app/constants/form-constants";
import { formTitleConstants } from "@app/constants/form-constants";
import {
  isEmptyString,
  isMskValid,
  isValidUrl,
} from "@app/utils/validationUtils";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import {
  decrypt,
  stringTosha256,
  visitorIdentity,
} from "@app/utils/passwordUtils";
import MuiTextField from "@app/components/textfield/MuiTextField";
import { numOfPasswordChangesTP } from "@app/constants/tooltip-constants";
import { toLowerCaseAllElement } from "@app/utils/helperUtils";
import { useModal } from "@app/components/modal-views/context";
import { useAppSelector, useAppDispatch } from "@app/store/hooks";
import { Close } from "@app/components/icons/close";
import TextFieldErrorList from "@app/components/textfield-error-list";
import useFormContext from "@app/components/form-views/form-context";

export default function GeneratePasswordView() {
  const { setFormContext, formContext } = useFormContext();
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const passwordProvider = useAppSelector(selectPasswordProvider);
  const generatePswState = formContext.generatePswState;

  const handleGeneratePassword = async () => {
    await hmacSha256(generatePswState).then((passwordhash) => {
      setFormContext({
        ...formContext,
        passwordHash: passwordhash,
      });
    });
  };

  const isFormFieldsValid =
    !isEmptyString(generatePswState.host) &&
    !isEmptyString(generatePswState.usernameEmail) &&
    isMskValid(generatePswState.msk);

  const isPasswordHashMatch =
    passwordProvider.hashMsk === stringTosha256(generatePswState.msk);

  const getMskInputProps = (
    <div className="flex space-x-4 items-center">
      {formContext.isMskVisible ? (
        <Eye
          onClick={() => {
            setFormContext({
              ...formContext,
              isMskVisible: false,
            });
          }}
          className="h-6 w-6 cursor-pointer"
        />
      ) : (
        <EyeSlash
          onClick={() => {
            if (
              isEmptyString(passwordProvider.msk) ||
              !isPasswordHashMatch ||
              isEmptyString(passwordProvider.pinHash)
            ) {
              setFormContext({
                ...formContext,
                isMskVisible: true,
              });
            } else {
              openModal("PINCODE_VIEW", { isSave: false });
            }
          }}
          className="h-6 w-6 cursor-pointer"
        />
      )}
      {isPasswordHashMatch && !isEmptyString(passwordProvider.pinHash) && (
        <Close
          onClick={() => {
            setFormContext({
              ...formContext,
              generatePswState: {
                ...generatePswState,
                msk: "",
              },
            });
          }}
          className="h-4 w-4 cursor-pointer"
        />
      )}
    </div>
  );

  const generatePasswordFormComponent = (
    <>
      <MuiTextField
        id={formIds.MSK}
        showStoreOption={
          isMskValid(generatePswState.msk) &&
          (!isPasswordHashMatch || isEmptyString(passwordProvider.pinHash))
        }
        label={formTitleConstants.SECURITY_KEY}
        value={generatePswState.msk}
        disabled={
          isPasswordHashMatch &&
          !formContext.isMskVisible &&
          !isEmptyString(passwordProvider.pinHash)
        }
        type={formContext.isMskVisible ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {!isEmptyString(generatePswState.msk) && getMskInputProps}
            </InputAdornment>
          ),
        }}
        error={
          isEmptyString(generatePswState.msk)
            ? false
            : !isMskValid(generatePswState.msk)
        }
        onSave={() => {
          openModal("PINCODE_VIEW", { isSave: true });
        }}
      />
      {/* msk validation error */}
      {!isEmptyString(generatePswState.msk) &&
        !isMskValid(generatePswState.msk) && <TextFieldErrorList />}

      <MuiTextField
        id={formIds.HOST}
        label={formTitleConstants.HOST}
        value={generatePswState.host}
        textfieldTypes="autocomplete"
        options={passwordProvider.hosts}
        placeholder="eg: facebook.com"
        showStoreOption={
          !toLowerCaseAllElement(passwordProvider.hosts).includes(
            generatePswState.host.toLowerCase()
          ) && isValidUrl(generatePswState.host)
        }
        onSave={() => {
          dispatch(
            setPasswordProvider({
              ...passwordProvider,
              hosts: [...passwordProvider.hosts, generatePswState.host],
            })
          );
        }}
      />
      {generatePswState.host !== "" && (
        <p className="text-xs text-danger -mt-3 pb-5">
          Hostname: <span>{getHostName(generatePswState.host)}</span>
        </p>
      )}

      <MuiTextField
        id={formIds.USERNAME_EMAIL}
        label={formTitleConstants.USERNAME_EMAIL}
        value={generatePswState.usernameEmail}
        textfieldTypes="autocomplete"
        options={passwordProvider.usernameEmails}
        showStoreOption={
          !toLowerCaseAllElement(passwordProvider.usernameEmails).includes(
            generatePswState.usernameEmail.toLowerCase()
          )
        }
        placeholder="eg: abc or abc@example.com"
        onSave={() => {
          dispatch(
            setPasswordProvider({
              ...passwordProvider,
              usernameEmails: [
                ...passwordProvider.usernameEmails,
                generatePswState.usernameEmail,
              ],
            })
          );
        }}
      />

      <div className="flex flex-col md:flex-row md:space-x-10 justify-between w-full ">
        <div className="md:w-1/2">
          <MuiTextField
            id={formIds.DATE}
            label={formTitleConstants.YEAR}
            type="number"
            select
            value={generatePswState.date}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          >
            {[2022, 2023, 2024].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </MuiTextField>
        </div>

        <div className="md:w-1/2">
          <MuiTextField
            id={formIds.RETRIES}
            label={`${formTitleConstants.RETRIES} ${generatePswState.date}`}
            type="number"
            value={generatePswState.retries}
            toolTipTitle={numOfPasswordChangesTP}
            showTooltip
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </div>
      </div>
    </>
  );

  const getInitialMskRenderer = () => {
    if (formContext.visitorId === "") {
      const savedUsernameEmailsLength = passwordProvider.usernameEmails.length;
      const savedHostsLength = passwordProvider.hosts.length;
      visitorIdentity().then((visitorIdentification) => {
        // set GeneratePswState hooks for display saved value in textfield
        setFormContext({
          ...formContext,
          visitorId: visitorIdentification,
          generatePswState: {
            ...formContext.generatePswState,
            msk: decrypt(passwordProvider.msk, visitorIdentification),
            host:
              savedHostsLength !== 0
                ? passwordProvider.hosts[savedHostsLength - 1]
                : "",
            usernameEmail:
              savedUsernameEmailsLength !== 0
                ? passwordProvider.usernameEmails[savedUsernameEmailsLength - 1]
                : "",
          },
        });
      });
    }
  };

  useEffect(() => {
    getInitialMskRenderer();
    if (isFormFieldsValid) {
      handleGeneratePassword();
    } else {
      setFormContext({
        ...formContext,
        passwordHash: "",
      });
    }
  }, [generatePswState]);

  return (
    <div className="w-full h-full bg-white  px-10 lg:px-20">
      <div
        className={cn(
          " space-y-8",
          isFormFieldsValid ? "lg:pt-28 pt-14" : "lg:pt-16 pt-10"
        )}
      >
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
