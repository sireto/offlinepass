import { useGeneratePasswordState } from "@app/lib/hooks/use-generate-passwordstate";
import useMskVisibility from "@app/lib/hooks/use-msk-visibility";
import useVisitorId from "@app/lib/hooks/use-visitorId";
import { showSweetAlertModal } from "@app/lib/modals/showModals";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { encrypt, stringTosha256 } from "@app/utils/passwordUtils";
import React, { useEffect, useState } from "react";
import { useModal } from "@app/components/modal-views/context";
import PinInputs from "@app/components/pin-boxes";

interface IpinCodeDetailsProps {
  pincodeDetails: { isSave: boolean };
}

export default function PincodeBox({ pincodeDetails }: IpinCodeDetailsProps) {
  const { closeModal } = useModal();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [repeatPin, setRepeatPin] = useState(["", "", "", ""]);
  const dispatch = useAppDispatch();
  const { visitorId } = useVisitorId();
  const { generatePswState } = useGeneratePasswordState();
  const passwordProvider = useAppSelector(selectPasswordProvider);
  const { setMskVisiblity } = useMskVisibility();
  const repeatPinError = () => {
    if (
      pin.toString() === repeatPin.toString() ||
      repeatPin.toString() === ["", "", "", ""].toString()
    )
      return "";
    return "Pin Mismatch";
  };

  const pinError = () => {
    if (
      stringTosha256(pin.toString()) === passwordProvider.pinHash ||
      pincodeDetails.isSave ||
      pin.toString() === ["", "", "", ""].toString()
    )
      return "";
    return "Wrong Pin";
  };
  useEffect(() => {
    if (
      stringTosha256(pin.toString()) === passwordProvider.pinHash &&
      !pincodeDetails.isSave
    ) {
      closeModal();
      setMskVisiblity(true);
    }
    if (
      pin.toString() === repeatPin.toString() &&
      pin.toString() !== ["", "", "", ""].toString()
    ) {
      debugger;
      dispatch(
        setPasswordProvider({
          msk: encrypt(generatePswState.msk, visitorId),
          hosts: passwordProvider.hosts,
          usernameEmails: passwordProvider.usernameEmails,
          hashMsk: stringTosha256(generatePswState.msk),
          pinHash: stringTosha256(pin.toString()),
        })
      );
      closeModal();
      showSweetAlertModal("Pin Set Successfully", "", "success");
    }
  }, [repeatPin, pin]);
  return (
    <div className="flex flex-col space-y-8 p-8  transition-opacity rounded-md opacity-100 shadow-lg bg-white w-[350px]">
      {/* <div
        className="flex cursor-pointer flex-row-reverse"
        onClick={() => closeModal()}
      >
        <Close className="h-4 w-4 text-gray-600 dark:text-white" />
      </div> */}
      {pincodeDetails.isSave && (
        <p className="font-medium text-xl text-black text-center">
          Secure Master Password Visibility
        </p>
      )}
      <PinInputs
        label="Enter your Pin"
        autoFocus
        mask
        error={pinError()}
        type="number"
        size="lg"
        onChange={(
          value: string | string[],
          index: number,
          values: string[]
        ) => {
          setPin(values);
        }}
        values={pin}
      />
      {pincodeDetails.isSave && (
        <>
          <PinInputs
            label="Retype your Pin"
            type="number"
            size="lg"
            error={repeatPinError()}
            mask
            onChange={(
              value: string | string[],
              index: number,
              values: string[]
            ) => {
              setRepeatPin(values);
            }}
            values={repeatPin}
          />
          <button
            onClick={() => {
              dispatch(
                setPasswordProvider({
                  msk: encrypt(generatePswState.msk, visitorId),
                  hosts: passwordProvider.hosts,
                  usernameEmails: passwordProvider.usernameEmails,
                  hashMsk: stringTosha256(generatePswState.msk),
                  pinHash: "",
                })
              );
              closeModal();
              showSweetAlertModal(
                "Warning!!",
                "Your Master Password is not secure",
                "warning"
              );
            }}
            className="text-end text-danger pr-5 "
          >
            Skip
          </button>
        </>
      )}
    </div>
  );
}
