import React from 'react'
import { useModal } from '@app/components/modal-views/context';
import PasswordContent from '@app/components/password-generate-view/password-content'

export default function PasswordGeneratedView() {
    const modal = useModal();
    const modalProps: string | null = modal?.modalProps;
    let renderContent = <></>;
    if (modal.isOpen && !modalProps)
    renderContent = (
        <div className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-5 py-10 dark:bg-light-dark">
            <p className="text-red-500 text-center">An unexpected error occurred!</p>
        </div>
    );
    if (!!modalProps) renderContent = <PasswordContent passwordHash={modalProps}/>

    return (
        <div className="relative z-50 inline-block w-full text-left align-middle xs:w-auto opacity-100 scale-100">
            {renderContent}
        </div>
    );

}
