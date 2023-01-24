import React from "react";
import { useModal } from "@app/components/modal-views/context";
import PinContent from "@app/components/pin/pin-content";

interface IPincodeProps {
  isSave: boolean;
}

export default function PincodeView({ ...props }) {
  const modal = useModal();
  const modalProps: IPincodeProps | null = modal?.modalProps;
  let renderContent = <></>;
  if (!!modalProps) renderContent = <PinContent pincodeDetails={modalProps} />;
  return (
    <div
      className="relative z-50 inline-block w-full h-full text-left  xs:w-auto opacity-100 scale-100"
      {...props}
    >
      {renderContent}
    </div>
  );
}
