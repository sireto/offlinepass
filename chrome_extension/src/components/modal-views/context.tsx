import { atom, useAtom } from "jotai";

export type MODAL_VIEW = "PINCODE_VIEW";
const modalAtom = atom({
  isOpen: false,
  view: "PINCODE_VIEW",
  modalProps: null,
});

export function useModal() {
  const [state, setState] = useAtom(modalAtom);
  const openModal = (view: MODAL_VIEW, modalProps: any | null) =>
    setState({ ...state, isOpen: true, view, modalProps });
  const closeModal = () => {
    setState({ ...state, isOpen: false, modalProps: null });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
