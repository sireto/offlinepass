import { Copy } from "@app/components/icons/copy";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { useState } from "react";
import { toast } from "react-toastify";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import Identicon from "react-identicons";
import VariantsAnimation from "@app/animation/variants-animation";
import { getHostName } from "@app/utils/hmacUtils";
import { isEmptyString } from "@app/utils/validationUtils";

interface IPasswordToastProps {
  host: string;
  generatedPasswordHash: string;
}

const PasswordToast = ({
  host,
  generatedPasswordHash,
}: IPasswordToastProps) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(generatedPasswordHash);
    toast.success(`Password copied for ${getHostName(host)}`, {
      autoClose: 1200,
    });
  };

  if (isEmptyString(generatedPasswordHash)) return <></>;

  const masked = "•".repeat(Math.max(generatedPasswordHash.length - 2, 0));
  const displayed = isPasswordVisible
    ? generatedPasswordHash
    : generatedPasswordHash.substring(0, 2) + masked;

  return (
    <VariantsAnimation
      startingPosition={-12}
      endingPostion={0}
      className="w-full mb-4"
    >
      <div className="rounded-2xl border border-buttonColor/30 bg-gradient-to-br from-brand to-buttonColor text-white shadow-lg shadow-buttonColor/20 overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Generated for{" "}
            <span className="text-white font-medium normal-case tracking-normal">
              {getHostName(host) || "—"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Identicon
              string={generatedPasswordHash}
              size={26}
              fg="white"
              bg="transparent"
            />
          </div>
          <p
            className="flex-1 font-mono text-base lg:text-lg tracking-wide select-all break-all"
            aria-label="generated password"
          >
            {displayed}
          </p>
          <button
            type="button"
            onClick={() => setPasswordVisibility((v) => !v)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isPasswordVisible ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeSlash className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy password"
            className="rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>
    </VariantsAnimation>
  );
};

export default PasswordToast;
