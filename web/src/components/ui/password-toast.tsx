import { Copy } from "@app/components/icons/copy";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { hideString } from "@app/utils/helperUtils";
import { useState } from "react";
import { toast } from "react-toastify";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import Identicon from "react-identicons";
import VariantsAnimation from "@app/animation/variants-animation";
import { getHostName } from "@app/utils/hmac";
import useFormContext from "@app/components/form-views/form-context";
import Button from "@app/components/ui/button/button";

const PasswordToast = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { formContext } = useFormContext();
  const [_, copyToClipboard] = useCopyToClipboard();
  const passwordHash = formContext.passwordHash;
  const handleCopyPassword = () => {
    copyToClipboard(passwordHash);
    toast.success(
      `Password copied for ${getHostName(formContext.generatePswState.host)}`,
      {
        autoClose: 1000,
      }
    );
  };

  // console.log(animalIdenticon("camelmasa").toSvg(64));
  return passwordHash === "" ? (
    <></>
  ) : (
    <VariantsAnimation
      startingPosition={-20}
      endingPostion={0}
      className={`flex z-20 fixed top-18 lg:top-24 left-0 w-full h-[46px] overflow-hidden  lg:w-1/2  text-sm xl:text-base items-center justify-between`}
    >
      <div className="flex items-center px-6  w-full h-full space-x-2 bg-[#CDFFD8]  xl:space-x-3 ">
        <p className="hidden md:block  lg:hidden xl:block font-medium text-[#555555] ">
          Generated Password:
        </p>
        <Identicon string={passwordHash} size={24} />
        <p className="text-center font-bold px-3 py-3 text-[#353535]  rounded-lg">
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
      </div>
      <Button
        onClick={handleCopyPassword}
        color="gray"
        className="h-[46px] flex  space-x-4 "
      >
        <p>Copy</p>
        <Copy className="h-6 w-6" />
      </Button>
    </VariantsAnimation>
  );
};

export default PasswordToast;
