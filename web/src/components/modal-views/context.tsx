import { atom, useAtom } from 'jotai';

export type MODAL_VIEW = 'PASSWORD_GENERATE' | 'MSK_GENERATE';
const modalAtom = atom({ isOpen: false, view: 'PASSWORD_GENERATE', modalProps: null });

export function useModal() {
    const [state, setState] = useAtom(modalAtom);
    const openModal = (view: MODAL_VIEW, modalProps: any | null) => setState({ ...state, isOpen: true, view, modalProps });
    const closeModal = () => {
        setState({ ...state, isOpen: false, modalProps: null });
    };

    return {
        ...state,
        openModal,
        closeModal
    };
}
