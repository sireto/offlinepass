import { useCopyToClipboard } from "@app/lib/hooks/ use-copy-to-clipboard";
import { toMidDottedStr } from "@app/utils/stringUtils";
import React from "react";
import { toast } from "react-toastify";
import { CheckCircle } from "../icons/checkcircle";
import { Close } from "../icons/close";
import { Copy } from "../icons/copy";
import { useModal } from "../modal-views/context";

interface IPasswordContent {
  passwordHash: string;
}

export default function PasswordContent({ passwordHash }: IPasswordContent) {
  const { closeModal } = useModal();
  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyPassword = () => {
    copyToClipboard(passwordHash);
    toast.success(`Copied! ${passwordHash} `, {
      autoClose: 1000,
    });
  };
  return (
    <div className="flex flex-col px-6 py-4  transition-opacity rounded-md opacity-100 shadow-lg bg-white w-[400px]">
      <div
        className="flex cursor-pointer flex-row-reverse"
        onClick={() => closeModal()}
      >
        <Close className="h-auto w-3 text-gray-600 dark:text-white" />
      </div>
      <div className="items-center justify-center flex flex-col my-10">
      <CheckCircle className="h-40 w-40 text-brand" />
      <p className="mt-5">Password Generated</p>
      <div className="flex flex-wrap space-x-3 justify-center mt-3">
        <p className="text-center">{toMidDottedStr(passwordHash)}</p>{" "}
        <Copy onClick={handleCopyPassword} className="h-5 w-5 cursor-pointer" />{" "}
      </div>
      </div>
    </div>
  );
}
