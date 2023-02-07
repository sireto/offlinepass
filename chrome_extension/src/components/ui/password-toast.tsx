import { Copy } from "@app/components/icons/copy";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { hideString } from "@app/utils/helperUtils";
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

  const handleCopyPassword = () => {
    copyToClipboard(generatedPasswordHash);
    toast.success(`Password copied for ${getHostName(host)}`, {
      autoClose: 1000,
    });
  };

  const iconClassName = "h-5 w-5 cursor-pointer text-white";

  // console.log(animalIdenticon("camelmasa").toSvg(64));
  return isEmptyString(generatedPasswordHash) ? (
    <></>
  ) : (
    <VariantsAnimation
      startingPosition={-20}
      endingPostion={0}
      className={`flex z-20 fixed top-0 left-0 w-[400px] h-[46px] bg-buttonColor overflow-hidden  text-sm items-center justify-between`}
    >
      <div className="flex items-center justify-center px-6 w-full h-full space-x-2  ">
        <Identicon string={generatedPasswordHash} size={24} fg="white" />
        <p className="px-2 text-xl font-bold py-3 text-white w-[260px] ">
          {generatedPasswordHash.substring(0, 2) +
            hideString(generatedPasswordHash.substring(2), isPasswordVisible)}
        </p>
        {isPasswordVisible ? (
          <Eye
            onClick={() => {
              setPasswordVisibility(false);
            }}
            className={iconClassName}
          />
        ) : (
          <EyeSlash
            onClick={() => {
              setPasswordVisibility(true);
            }}
            className={iconClassName}
          />
        )}
        <Copy onClick={handleCopyPassword} className={iconClassName} />
      </div>
    </VariantsAnimation>
  );
};

export default PasswordToast;
