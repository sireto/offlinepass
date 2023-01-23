import { Copy } from "@app/components/icons/copy";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { hideString } from "@app/utils/helperUtils";
import { useState } from "react";
import { toast } from "react-toastify";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import { usePassword } from "@app/lib/hooks/use-password";
import Identicon from "react-identicons";
import VariantsAnimation from "@app/animation/variants-animation";
import { useGeneratePasswordState } from "@app/lib/hooks/use-generate-passwordstate";
import { getHostName } from "@app/utils/hmac";

const PasswordToast = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { passwordHash } = usePassword();
  const { generatePswState } = useGeneratePasswordState();
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopyPassword = () => {
    copyToClipboard(passwordHash!);
    toast.success(`Password copied for ${getHostName(generatePswState.host)}`, {
      autoClose: 1000,
    });
  };

  // console.log(animalIdenticon("camelmasa").toSvg(64));
  return passwordHash === "" ? (
    <></>
  ) : (
    <VariantsAnimation
      startingPosition={-20}
      endingPostion={0}
      className={`flex z-20 fixed top-20 sm:top-24 left-0 w-full lg:w-1/2 lg:pr-10 pr-0  text-sm xl:text-base items-center`}
    >
      <div className="flex items-center px-6  w-full h-full space-x-2 bg-[#CDFFD8] justify-center  xl:space-x-3 ">
        <p className="hidden md:block  lg:hidden xl:block font-medium text-[#555555] ">
          Your password has been generated:
        </p>
        <Identicon string={passwordHash} size={24} />
        <p className="text-center font-bold px-3 my-2 text-[#353535] py-1  rounded-lg">
          {passwordHash.substring(0, 2) +
            hideString(passwordHash.substring(2), isPasswordVisible)}
        </p>
        {isPasswordVisible ? (
          <Eye
            onClick={() => {
              setPasswordVisibility(false);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        ) : (
          <EyeSlash
            onClick={() => {
              setPasswordVisibility(true);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        )}
        <button onClick={handleCopyPassword} className="h-full px-3 py-3 ">
          <Copy className="h-6 w-6" />
        </button>
      </div>
    </VariantsAnimation>
  );
};

export default PasswordToast;
