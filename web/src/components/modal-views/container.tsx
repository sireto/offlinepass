import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
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
    router.events.on("routeChangeStart", closeModal);
    return () => {
      router.events.off("routeChangeStart", closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-700/60 backdrop-blur" />
        </TransitionChild>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-105"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-105"
            >
              <DialogPanel className="relative z-50 flex w-min items-center justify-center text-left align-middle">
                {view && renderModalContent(view)}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
