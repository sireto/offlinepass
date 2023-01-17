import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { Close } from "@app/components/icons/close";
import Button from "@app/components/ui/button/button";
import { Dialog } from "@app/components/ui/dialog";
import { Transition } from "@app/components/ui/transition";
import { MODAL_VIEW, useModal } from "@app/components/modal-views/context";
import PincodeView from "@app/components/pin";

function renderModalContent(view: MODAL_VIEW | string) {
  switch (view) {
    case "PINCODE_VIEW":
      return <PincodeView />;
    default:
      return null;
  }
}

export default function container() {
  const router = useRouter();
  const { view, isOpen, closeModal } = useModal();
  useEffect(() => {
    // close search modal when route change
    router.events.on("routeChangeStart", closeModal);
    return () => {
      router.events.off("routeChangeStart", closeModal);
    };
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 h-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
        </Transition.Child>
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-105"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-105"
          >
            <div className="relative z-50 flex w-min items-center justify-center text-left align-middle">
              {view && renderModalContent(view)}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
