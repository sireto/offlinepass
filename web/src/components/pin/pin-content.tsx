import { showSweetAlertModal } from "@app/lib/modals/showModals";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import { selectPasswordProvider } from "@app/store/password/selectors";
import {
  encryptMsk,
  decryptMsk,
  stringTosha256,
  repeatPinError,
  pinError,
} from "@app/utils/passwordUtils";
import React, { useEffect, useRef, useState } from "react";
import { useModal } from "@app/components/modal-views/context";
import PinInputs from "@app/components/pin-box";
import { IPincodeProps } from "@app/components/pin";
import { Lock } from "@app/components/icons/lock";
import { Close } from "@app/components/icons/close";

interface IpinCodeDetailsProps {
  pincodeProps: IPincodeProps;
}

export default function PinContent({ pincodeProps }: IpinCodeDetailsProps) {
  const { closeModal } = useModal();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [repeatPin, setRepeatPin] = useState(["", "", "", ""]);
  const [wrongPin, setWrongPin] = useState(false);
  const [busy, setBusy] = useState(false);
  const dispatch = useAppDispatch();
  const passwordProvider = useAppSelector(selectPasswordProvider);
  const lastTriedPinRef = useRef<string>("");

  const isSave = pincodeProps.isSave;

  const verifyAndUnlock = async () => {
    const pinStr = pin.join("");
    if (pinStr.length < pin.length || busy) return;
    if (pinStr === lastTriedPinRef.current) return;
    lastTriedPinRef.current = pinStr;
    setBusy(true);
    const plaintext = await decryptMsk(passwordProvider.msk, pinStr);
    setBusy(false);
    if (plaintext === null) {
      setWrongPin(true);
      return;
    }
    setWrongPin(false);
    pincodeProps.onUnlock?.(plaintext);
    pincodeProps.setMskVisiblity(true);
    closeModal();
  };

  const setPincodeAndEncrypt = async () => {
    const pinStr = pin.join("");
    if (busy) return;
    if (pinStr !== repeatPin.join("") || pin.includes("")) return;
    setBusy(true);
    const ciphertext = await encryptMsk(
      pincodeProps.generatePswState.msk,
      pinStr
    );
    dispatch(
      setPasswordProvider({
        ...passwordProvider,
        msk: ciphertext,
        hashMsk: stringTosha256(pincodeProps.generatePswState.msk),
      })
    );
    setBusy(false);
    closeModal();
    pincodeProps.setMskVisiblity(false);
    showSweetAlertModal("Master Key saved", "", "success");
  };

  useEffect(() => {
    if (isSave) {
      setPincodeAndEncrypt();
    } else {
      verifyAndUnlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeatPin, pin]);

  const onChangeHandler = (
    _value: string | string[],
    _index: number,
    values: string[]
  ) => {
    if (wrongPin) setWrongPin(false);
    setPin(values);
  };

  const headerTitle = isSave ? "Secure your Master Key" : "Unlock your Master Key";
  const headerSubtitle = isSave
    ? "Choose a PIN. We use it to encrypt your key with PBKDF2 + AES-GCM before saving it locally."
    : "Enter the PIN you set to decrypt the key stored on this device.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pin-modal-title"
      className="relative w-[min(92vw,360px)] rounded-2xl bg-white shadow-2xl border border-textfield_stroke overflow-hidden"
    >
      <button
        type="button"
        onClick={closeModal}
        aria-label="Close"
        className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-textfield_label hover:bg-lightBackground hover:text-brand transition-colors"
      >
        <Close className="h-3.5 w-3.5" />
      </button>

      <div className="px-6 pt-7 pb-2 flex flex-col items-center text-center">
        <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
          <Lock className="h-5 w-5" />
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
        </div>
        <h2
          id="pin-modal-title"
          className="mt-4 text-base font-semibold text-brand"
        >
          {headerTitle}
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-textfield_label max-w-[280px]">
          {headerSubtitle}
        </p>
      </div>

      <div className="px-6 pt-4 pb-5 space-y-3">
        <PinInputs
          name="pin"
          label={isSave ? "Choose PIN" : "PIN"}
          autoFocus
          mask
          error={pinError(pin, isSave, wrongPin)}
          onChange={onChangeHandler}
          values={pin}
        />
        {isSave && (
          <PinInputs
            name="confirm pin"
            label="Confirm PIN"
            error={repeatPinError(pin, repeatPin)}
            mask
            onChange={(_v, _i, values: string[]) => setRepeatPin(values)}
            values={repeatPin}
          />
        )}
      </div>

      <div className="border-t border-textfield_stroke bg-lightBackground px-6 py-3 flex items-center justify-between gap-3">
        <p className="text-[11px] leading-snug text-lightGray">
          {busy
            ? "Encrypting…"
            : isSave
            ? "Tip: longer PINs are exponentially harder to brute-force."
            : "Wrong PIN? The decryption auth tag will fail."}
        </p>
        <button
          type="button"
          onClick={closeModal}
          disabled={busy}
          className="text-xs font-semibold text-textfield_label hover:text-brand disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {busy && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div
            aria-label="Working"
            className="h-8 w-8 rounded-full border-2 border-buttonColor/30 border-t-buttonColor animate-spin"
          />
        </div>
      )}
    </div>
  );
}
