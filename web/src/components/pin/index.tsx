import React from "react";
import { useModal } from "@app/components/modal-views/context";
import PincodeBox from "@app/components/pin/pin-content";

interface IPincodeProps {
  isSave: boolean;
}

export default function PincodeView({ ...props }) {
  const modal = useModal();
  const modalProps: IPincodeProps | null = modal?.modalProps;
  let renderContent = <></>;
  if (modal.isOpen && !modalProps)
    renderContent = (
      <div className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-5 py-10 dark:bg-light-dark">
        <p className="text-red-500 text-center">
          An unexpected error occurred!
        </p>
      </div>
    );
  if (!!modalProps) renderContent = <PincodeBox pincodeDetails={modalProps} />;
  return (
    <div
      className="relative z-50 inline-block w-full h-full text-left  xs:w-auto opacity-100 scale-100"
      {...props}
    >
      {renderContent}
    </div>
  );
}
