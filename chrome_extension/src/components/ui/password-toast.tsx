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
    toast.success(`Copied for ${getHostName(host) || "this site"}`, {
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
      startingPosition={-8}
      endingPostion={0}
      className="w-full"
    >
      <div className="rounded-xl bg-gradient-to-br from-brand to-buttonColor text-white shadow-md shadow-buttonColor/20 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 pt-2.5 text-[10px] uppercase tracking-[0.06em] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span>Generated for</span>
          <span className="text-white font-medium normal-case tracking-normal">
            {getHostName(host) || "—"}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 pt-2 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 flex-shrink-0">
            <Identicon
              string={generatedPasswordHash}
              size={20}
              fg="white"
              bg="transparent"
            />
          </div>
          <p
            className="flex-1 font-mono text-sm tracking-wide select-all break-all"
            aria-label="generated password"
          >
            {displayed}
          </p>
          <button
            type="button"
            onClick={() => setPasswordVisibility((v) => !v)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="rounded-md p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isPasswordVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeSlash className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy password"
            className="rounded-md p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </VariantsAnimation>
  );
};

export default PasswordToast;
