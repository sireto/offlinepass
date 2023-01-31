import React, { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import { getHostName, hmacSha256 } from "@app/utils/hmacUtils";
import {
  formIds,
  generatePasswordViewConstants,
  storeOptionToolTipConstants,
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
import MuiTextField, {
  inputPropsStyle,
} from "@app/components/textfield/MuiTextField";
import { numOfPasswordChangesTP } from "@app/constants/tooltip-constants";
import { toLowerCaseAllElement } from "@app/utils/helperUtils";
import { useModal } from "@app/components/modal-views/context";
import { useAppSelector, useAppDispatch } from "@app/store/hooks";
import { Close } from "@app/components/icons/close";
import TextFieldErrorList from "@app/components/textfield-error-list";
import moment from "moment";
import PasswordToast from "@app/components/ui/password-toast";
import MuiSelect from "@app/components/select/MuiSelect";

export default function GeneratePasswordView() {
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const passwordProvider = useAppSelector(selectPasswordProvider);
  const [generatePasswordHash, setGeneratePasswordHash] = useState("");
  const [isMskVisible, setMskVisibility] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [generatePswState, setGeneratePswState] = useState({
    msk: "",
    host: "",
    usernameEmail: "",
    date: moment(Date.now()).format("YYYY"),
    retries: "0",
  });

  const handleGeneratePassword = async () => {
    await hmacSha256(generatePswState).then((passwordhash) => {
      setGeneratePasswordHash(passwordhash);
    });
  };

  const showPasswordToast = (host: string, generatedPasswordHash: string) => {
    return (
      <PasswordToast
        host={host}
        generatedPasswordHash={generatedPasswordHash}
      />
    );
  };

  const isFormFieldsValid =
    !isEmptyString(generatePswState.host) &&
    !isEmptyString(generatePswState.usernameEmail) &&
    isMskValid(generatePswState.msk);

  const isPasswordHashMatch =
    passwordProvider.hashMsk === stringTosha256(generatePswState.msk);

  const getMskInputProps = (
    <div className="flex space-x-4 items-center">
      {isMskVisible ? (
        <Eye
          onClick={() => {
            setMskVisibility(false);
          }}
          className="h-4 w-4 cursor-pointer"
        />
      ) : (
        <EyeSlash
          onClick={() => {
            if (
              isEmptyString(passwordProvider.msk) ||
              !isPasswordHashMatch ||
              isEmptyString(passwordProvider.pinHash)
            ) {
              setMskVisibility(true);
            } else {
              openModal("PINCODE_VIEW", {
                setMskVisiblity: setMskVisibility,
                visitorId: visitorId,
                generatePswState: generatePswState,
              });
            }
          }}
          className="h-4 w-4 cursor-pointer"
        />
      )}
      {isPasswordHashMatch && !isEmptyString(passwordProvider.pinHash) && (
        <Close
          onClick={() => {
            setGeneratePswState({
              ...generatePswState,
              msk: "",
            });
          }}
          className="h-3 w-3 cursor-pointer"
        />
      )}
    </div>
  );

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setGeneratePswState({
      ...generatePswState,
      [event.target.id]: event.target.value,
    });
  };

  const handleDate = (event) => {
    setGeneratePswState({
      ...generatePswState,
      date: event.target.value,
    });
  };

  const handleOnSelect = (event: React.SyntheticEvent<HTMLDivElement, Event>) =>
    setGeneratePswState({
      ...generatePswState,
      [event.target["id"]]: event.target["value"],
    });

  // type PswStateType = "msk" | "hosts" | "usernameEmails" | "hashMsk" | "pinHash";

  // const onSavehandler = (PswState: PswStateType, value) => {
  //   dispatch(
  //     setPasswordProvider({
  //       ...passwordProvider,
  //       [PswState]: value,
  //     })
  //   );
  // };

  const generatePasswordFormComponent = (
    <>
      <MuiTextField
        id={formIds.MSK}
        isSave={
          isMskValid(generatePswState.msk) &&
          (!isPasswordHashMatch || isEmptyString(passwordProvider.pinHash))
        }
        label={formTitleConstants.SECURITY_KEY}
        value={generatePswState.msk}
        onChange={handleOnChange}
        toolTipTitle={storeOptionToolTipConstants.SECURITY_KEY}
        disabled={
          isPasswordHashMatch &&
          !isMskVisible &&
          !isEmptyString(passwordProvider.pinHash)
        }
        type={isMskVisible ? "text" : "password"}
        InputProps={{
          style: inputPropsStyle,
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
          openModal("PINCODE_VIEW", {
            isSave: true,
            setMskVisiblity: setMskVisibility,
            visitorId: visitorId,
            generatePswState: generatePswState,
          });
        }}
      />
      {/* msk validation error */}
      {!isEmptyString(generatePswState.msk) &&
        !isMskValid(generatePswState.msk) && (
          <TextFieldErrorList value={generatePswState.msk} />
        )}

      <MuiTextField
        id={formIds.HOST}
        label={formTitleConstants.HOST}
        value={generatePswState.host}
        onSelect={handleOnSelect}
        toolTipTitle={storeOptionToolTipConstants.HOST}
        textfieldTypes="autocomplete"
        options={passwordProvider.hosts}
        placeholder="eg: facebook.com"
        onChange={handleOnChange}
        isSave={
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
        <p className="text-[10px] text-danger -mt-2 pb-3">
          Hostname: <span>{getHostName(generatePswState.host)}</span>
        </p>
      )}

      <MuiTextField
        id={formIds.USERNAME_EMAIL}
        onSelect={handleOnSelect}
        label={formTitleConstants.USERNAME_EMAIL}
        value={generatePswState.usernameEmail}
        toolTipTitle={storeOptionToolTipConstants.USERNAME_EMAIL}
        textfieldTypes="autocomplete"
        onChange={handleOnChange}
        options={passwordProvider.usernameEmails}
        isSave={
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
      <div className="flex items-center font-medium text-xs md:text-sm text-textfield_label mb-2">
        {formTitleConstants.YEAR}
      </div>
      <MuiSelect
        className="w-full mb-4"
        options={["2022", "2023", "2024"]}
        onChange={handleDate}
        value={generatePswState.date}
      />
      <MuiTextField
        id={formIds.RETRIES}
        label={`${formTitleConstants.RETRIES} ${generatePswState.date}`}
        type="number"
        onChange={handleOnChange}
        showStoreOption={false}
        value={generatePswState.retries}
        toolTipTitle={numOfPasswordChangesTP}
        showTooltip
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
    </>
  );

  const getInitialMskRenderer = () => {
    if (visitorId === "") {
      const savedUsernameEmailsLength = passwordProvider.usernameEmails.length;
      const savedHostsLength = passwordProvider.hosts.length;
      visitorIdentity().then((visitorIdentification) => {
        // set GeneratePswState hooks for display saved value in textfield
        setVisitorId(visitorIdentification);
        setGeneratePswState({
          ...generatePswState,
          msk: decrypt(passwordProvider.msk, visitorIdentification),
          host:
            savedHostsLength !== 0
              ? passwordProvider.hosts[savedHostsLength - 1]
              : "",
          usernameEmail:
            savedUsernameEmailsLength !== 0
              ? passwordProvider.usernameEmails[savedUsernameEmailsLength - 1]
              : "",
        });
      });
    }
  };

  useEffect(() => {
    getInitialMskRenderer();
    if (isFormFieldsValid) {
      handleGeneratePassword();
    } else {
      setGeneratePasswordHash("");
    }
  }, [generatePswState]);

  return (
    <div className="lg:w-[400px] w-full h-full ">
      {!isEmptyString(generatePasswordHash) &&
        showPasswordToast(generatePswState.host, generatePasswordHash)}
      <div className="px-8 py-10 shadow-md rounded-none lg:rounded-lg bg-white">
        {generatePasswordFormComponent}
      </div>
      {/* </div> */}
    </div>
  );
}
