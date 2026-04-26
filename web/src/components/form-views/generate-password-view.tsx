import React, { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import { getHostName, hmacSha256 } from "@app/utils/hmacUtils";
import {
  formIds,
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
import { Lock } from "@app/components/icons/lock";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import {
  isLegacyEncryptedMsk,
  stringTosha256,
} from "@app/utils/passwordUtils";
import MuiTextField, {
  inputPropsStyle,
} from "@app/components/textfield/MuiTextField";
import { toLowerCaseAllElement } from "@app/utils/helperUtils";
import { useModal } from "@app/components/modal-views/context";
import { useAppSelector, useAppDispatch } from "@app/store/hooks";
import { Close } from "@app/components/icons/close";
import TextFieldErrorList from "@app/components/textfield-error-list";
import moment from "moment";
import PasswordToast from "@app/components/ui/password-toast";
import MuiSelect from "@app/components/select/MuiSelect";
import { useYearOptions } from "@app/lib/hooks/use-year-options";

export default function GeneratePasswordView() {
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const passwordProvider = useAppSelector(selectPasswordProvider);
  const [generatePasswordHash, setGeneratePasswordHash] = useState("");
  const [isMskVisible, setMskVisibility] = useState(false);
  const [generatePswState, setGeneratePswState] = useState({
    msk: "",
    host: "",
    usernameEmail: "",
    date: moment(Date.now()).format("YYYY"),
    retries: 0,
  });
  const yearOptions = useYearOptions();

  const handleGeneratePassword = async () => {
    await hmacSha256(generatePswState).then((passwordhash) => {
      setGeneratePasswordHash(passwordhash);
    });
  };

  const isFormFieldsValid =
    !isEmptyString(generatePswState.host) &&
    !isEmptyString(generatePswState.usernameEmail) &&
    isMskValid(generatePswState.msk);

  const isPasswordHashMatch =
    passwordProvider.hashMsk === stringTosha256(generatePswState.msk);
  const hasStoredMsk = !isEmptyString(passwordProvider.msk);
  const hasUnsavedMsk =
    isMskValid(generatePswState.msk) &&
    (!hasStoredMsk || !isPasswordHashMatch);

  const handleUnlockedMsk = (plaintextMsk: string) => {
    setGeneratePswState((prev) => ({ ...prev, msk: plaintextMsk }));
  };

  const openUnlockModal = () => {
    openModal("PINCODE_VIEW", {
      isSave: false,
      setMskVisiblity: setMskVisibility,
      generatePswState: generatePswState,
      onUnlock: handleUnlockedMsk,
    });
  };

  const openSaveModal = () => {
    openModal("PINCODE_VIEW", {
      isSave: true,
      setMskVisiblity: setMskVisibility,
      generatePswState: generatePswState,
    });
  };

  const getMskInputProps = (
    <div className="flex space-x-3 items-center">
      <button
        type="button"
        onClick={() => {
          if (isMskVisible) {
            setMskVisibility(false);
            return;
          }
          if (isEmptyString(passwordProvider.msk) || !isPasswordHashMatch) {
            setMskVisibility(true);
          } else {
            openUnlockModal();
          }
        }}
        aria-label={isMskVisible ? "Hide Master Key" : "Show Master Key"}
        className="text-textfield_label hover:text-brand transition-colors"
      >
        {isMskVisible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeSlash className="h-4 w-4" />
        )}
      </button>
      {isPasswordHashMatch && hasStoredMsk && (
        <button
          type="button"
          onClick={() =>
            setGeneratePswState({ ...generatePswState, msk: "" })
          }
          aria-label="Clear Master Key"
          className="text-textfield_label hover:text-danger transition-colors"
        >
          <Close className="h-3 w-3" />
        </button>
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

  useEffect(() => {
    if (isFormFieldsValid) {
      handleGeneratePassword();
    } else {
      setGeneratePasswordHash("");
    }
  }, [generatePswState]);

  useEffect(() => {
    if (hasStoredMsk && isLegacyEncryptedMsk(passwordProvider.msk)) {
      dispatch(
        setPasswordProvider({
          ...passwordProvider,
          msk: "",
          hashMsk: "",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUnlockBanner =
    hasStoredMsk && isEmptyString(generatePswState.msk);

  return (
    <div className="w-full max-w-[460px] mx-auto">
      <PasswordToast
        host={generatePswState.host}
        generatedPasswordHash={generatePasswordHash}
      />
      <div className="rounded-2xl bg-white border border-textfield_stroke shadow-[0_8px_32px_-8px_rgba(0,62,107,0.12)] p-6 lg:p-8">
        {showUnlockBanner && (
          <button
            type="button"
            onClick={openUnlockModal}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 mb-6 rounded-xl border border-buttonColor/30 bg-buttonColor/5 hover:bg-buttonColor/10 text-left transition-colors group"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-buttonColor/10 text-buttonColor">
                <Lock className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-brand">
                  You have a saved Master Key
                </span>
                <span className="text-xs text-textfield_label">
                  Enter your PIN to unlock
                </span>
              </span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-buttonColor group-hover:text-brand">
              Unlock →
            </span>
          </button>
        )}

        <MuiTextField
          id={formIds.MSK}
          isSave={hasUnsavedMsk}
          label={formTitleConstants.SECURITY_KEY}
          value={generatePswState.msk}
          onChange={handleOnChange}
          showStoreOption={false}
          toolTipTitle={storeOptionToolTipConstants.SECURITY_KEY}
          disabled={isPasswordHashMatch && !isMskVisible && hasStoredMsk}
          type={isMskVisible ? "text" : "password"}
          placeholder="A long phrase only you know"
          InputProps={{
            style: inputPropsStyle,
            endAdornment: (
              <InputAdornment position="end">
                {!isEmptyString(generatePswState.msk) && getMskInputProps}
              </InputAdornment>
            ),
          }}
          error={
            isEmptyString(generatePswState.msk)
              ? false
              : !isMskValid(generatePswState.msk)
          }
        />
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
          placeholder="eg: github.com"
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
        {!isEmptyString(generatePswState.host) && (
          <p className="-mt-3 mb-4 text-[11px] text-textfield_label">
            <span className="text-lightGray">Hostname →</span>{" "}
            <span className="font-mono text-brand">
              {getHostName(generatePswState.host)}
            </span>
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
            ) && !isEmptyString(generatePswState.usernameEmail)
          }
          placeholder="eg: you@example.com"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center pb-2 text-sm text-textfield_label font-medium">
              {formTitleConstants.YEAR}
            </div>
            <MuiSelect
              className="w-full"
              options={yearOptions}
              onChange={handleDate}
              value={generatePswState.date}
            />
          </div>
          <div>
            <MuiTextField
              id={formIds.RETRIES}
              label={`${formTitleConstants.RETRIES}${generatePswState.date}`}
              type="number"
              onChange={handleOnChange}
              showStoreOption={false}
              value={generatePswState.retries}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </div>
        </div>

        {hasUnsavedMsk && (
          <button
            type="button"
            onClick={openSaveModal}
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-brand text-white text-sm font-medium py-3 hover:bg-buttonColor transition-colors"
          >
            <Lock className="h-4 w-4" />
            Save Master Key with a PIN
          </button>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-lightGray">
        Nothing leaves your browser. Open the network tab to verify.
      </p>
    </div>
  );
}
