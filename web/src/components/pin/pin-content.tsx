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
import ImageRenderer from "@app/components/media-renderer/image-renderer";
import { IPincodeProps } from "@app/components/pin";

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
    if (pin.join("") !== repeatPin.join("") || pin.includes("")) return;
    setBusy(true);
    const ciphertext = await encryptMsk(
      pincodeProps.generatePswState.msk,
      pinStr
    );
    setBusy(false);
    dispatch(
      setPasswordProvider({
        ...passwordProvider,
        msk: ciphertext,
        hashMsk: stringTosha256(pincodeProps.generatePswState.msk),
      })
    );
    closeModal();
    pincodeProps.setMskVisiblity(false);
    showSweetAlertModal("Pin Set Successfully", "", "success");
  };

  useEffect(() => {
    if (pincodeProps.isSave) {
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

  const getCreatePin = () => {
    return (
      <>
        <PinInputs
          name="pin"
          label={"Enter pin to Secure Master Password"}
          autoFocus
          mask
          error={pinError(pin, pincodeProps.isSave, wrongPin)}
          onChange={onChangeHandler}
          values={pin}
        />
        <PinInputs
          name="confirm pin"
          label="Confirm your Pin"
          error={repeatPinError(pin, repeatPin)}
          mask
          onChange={(
            _value: string | string[],
            _index: number,
            values: string[]
          ) => {
            setRepeatPin(values);
          }}
          values={repeatPin}
        />
      </>
    );
  };

  const getConfirmPin = () => {
    return (
      <PinInputs
        name="pin"
        label={"Enter pin to Unlock Master Password"}
        autoFocus
        mask
        error={pinError(pin, pincodeProps.isSave, wrongPin)}
        onChange={onChangeHandler}
        values={pin}
      />
    );
  };

  return (
    <div className="flex flex-col px-8 py-1   transition-opacity rounded-md opacity-100 shadow-lg bg-white w-[300px]">
      <div className="flex flex-col pt-6 items-center justify-center space-y-2 mb-5">
        <div className="h-[100px] w-[100px] rounded-full overflow-hidden">
          <ImageRenderer src="/favicon.ico" />
        </div>
        <p className=" font-bold">Offline Pass</p>
      </div>
      {pincodeProps.isSave ? getCreatePin() : getConfirmPin()}
    </div>
  );
}
