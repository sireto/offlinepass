/* eslint-disable react-hooks/exhaustive-deps */
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
    ? "Choose a PIN. We use it to encrypt your key locally."
    : "Enter the PIN you set on this device.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="relative w-[280px] rounded-2xl bg-white shadow-2xl border border-textfield_stroke overflow-hidden"
    >
      <button
        type="button"
        onClick={closeModal}
        aria-label="Close"
        className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-lg text-textfield_label hover:bg-lightBackground hover:text-brand transition-colors"
      >
        <Close className="h-3 w-3" />
      </button>

      <div className="px-5 pt-5 pb-1 flex flex-col items-center text-center">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
          <Lock className="h-4 w-4" />
        </div>
        <h2 className="mt-3 text-sm font-semibold text-brand">{headerTitle}</h2>
        <p className="mt-1 text-[11px] leading-relaxed text-textfield_label">
          {headerSubtitle}
        </p>
      </div>

      <div className="px-5 pt-3 pb-3 space-y-2">
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

      <div className="border-t border-textfield_stroke bg-lightBackground px-5 py-2 flex items-center justify-end">
        <button
          type="button"
          onClick={closeModal}
          disabled={busy}
          className="text-[11px] font-semibold text-textfield_label hover:text-brand disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {busy && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="h-7 w-7 rounded-full border-2 border-buttonColor/30 border-t-buttonColor animate-spin" />
        </div>
      )}
    </div>
  );
}
