import { showSweetAlertModal } from "@app/lib/modals/showModals";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { setPasswordProvider } from "@app/store/password/passwordSlice";
import { selectPasswordProvider } from "@app/store/password/selectors";
import {
  encrypt,
  stringTosha256,
  repeatPinError,
  pinError,
} from "@app/utils/passwordUtils";
import React, { useEffect, useState } from "react";
import { useModal } from "@app/components/modal-views/context";
import PinInputs from "@app/components/pin-box";
import Button from "@app/components/ui/button/button";
import ImageRenderer from "@app/components/media-renderer/image-renderer";
import { IPincodeProps } from "@app/components/pin";

interface IpinCodeDetailsProps {
  pincodeProps: IPincodeProps;
}

export default function PinContent({ pincodeProps }: IpinCodeDetailsProps) {
  const { closeModal } = useModal();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [repeatPin, setRepeatPin] = useState(["", "", "", ""]);
  const dispatch = useAppDispatch();
  const passwordProvider = useAppSelector(selectPasswordProvider);

  const pinCodeValidationHandler = () => {
    if (
      stringTosha256(pin.toString()) === passwordProvider.pinHash &&
      !pincodeProps.isSave
    ) {
      closeModal();
      pincodeProps.setMskVisiblity(true);
    }
  };

  const setPincodehandler = () => {
    if (pin.toString() === repeatPin.toString() && !pin.includes("")) {
      dispatch(
        setPasswordProvider({
          ...passwordProvider,
          msk: encrypt(
            pincodeProps.generatePswState.msk,
            pincodeProps.visitorId
          ),
          hashMsk: stringTosha256(pincodeProps.generatePswState.msk),
          pinHash: stringTosha256(pin.toString()),
        })
      );
      closeModal();
      pincodeProps.setMskVisiblity(false);
      showSweetAlertModal("Pin Set Successfully", "", "success");
    }
  };

  useEffect(() => {
    // pincode validation
    pinCodeValidationHandler();
    // set pincode
    setPincodehandler();
  }, [repeatPin, pin]);

  const skipButtonClickHandler = () => {
    dispatch(
      setPasswordProvider({
        ...passwordProvider,
        msk: encrypt(pincodeProps.generatePswState.msk, pincodeProps.visitorId),
        hashMsk: stringTosha256(pincodeProps.generatePswState.msk),
        pinHash: "",
      })
    );
    closeModal();
    showSweetAlertModal(
      "Warning!!",
      "Your Master Password is not secure",
      "warning"
    );
  };

  const onChangeHandler = (
    value: string | string[],
    index: number,
    values: string[]
  ) => {
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
          error={pinError(pin, passwordProvider, pincodeProps)}
          onChange={onChangeHandler}
          values={pin}
        />
        <PinInputs
          name="confirm pin"
          label="Confirm your Pin"
          error={repeatPinError(pin, repeatPin)}
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
        <div className="flex  justify-center">
          <Button
            color="danger"
            className="w-min  -mt-3 h-10"
            onClick={skipButtonClickHandler}
            variant="transparent"
          >
            Skip
          </Button>
        </div>
      </>
    );
  };

  const getConfirmPin = () => {
    return (
      <PinInputs
        name="pin"
        label={"Enter pin to View Master Password"}
        autoFocus
        mask
        error={pinError(pin, passwordProvider, pincodeProps)}
        onChange={onChangeHandler}
        values={pin}
      />
    );
  };

  return (
    <div className="flex flex-col px-8 py-1   transition-opacity rounded-md opacity-100 shadow-lg bg-white w-[300px]">
      <div className="flex flex-col pt-6 items-center justify-center space-y-2 mb-5">
        <div className="h-[100px] w-[100px] rounded-full overflow-hidden">
          <ImageRenderer imageSrc="/images/icon.png" />
        </div>
        <p className=" font-bold">Offline Pass</p>
      </div>
      {pincodeProps.isSave ? getCreatePin() : getConfirmPin()}
    </div>
  );
}
