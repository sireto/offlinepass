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
import Button from "@app/components/ui/button/button";
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

  // console.log(animalIdenticon("camelmasa").toSvg(64));
  return isEmptyString(generatedPasswordHash) ? (
    <></>
  ) : (
    <VariantsAnimation
      startingPosition={-20}
      endingPostion={0}
      className={`flex z-20 fixed lg:static lg:my-2 my-0 lg:py-7 py-4 lg:rounded-lg rounded-none top-16 left-0 w-full h-[46px] bg-buttonColor overflow-hidden  lg:w-[400px]  text-sm xl:text-base items-center justify-between`}
    >
      <div className="flex items-center justify-center px-6 w-full h-full space-x-2  xl:space-x-3 ">
        <Identicon string={generatedPasswordHash} size={24} fg="white" />
        <p className="text-center font-bold p-3 text-white ">
          {generatedPasswordHash.substring(0, 2) +
            hideString(generatedPasswordHash.substring(2), isPasswordVisible)}
        </p>
        {isPasswordVisible ? (
          <Eye
            onClick={() => {
              setPasswordVisibility(false);
            }}
            className="h-6 w-6 cursor-pointer text-white"
          />
        ) : (
          <EyeSlash
            onClick={() => {
              setPasswordVisibility(true);
            }}
            className="h-6 w-6 cursor-pointer text-white"
          />
        )}
        <Copy
          onClick={handleCopyPassword}
          className="h-6 w-6 text-white cursor-pointer"
        />
      </div>
    </VariantsAnimation>
  );
};

export default PasswordToast;
