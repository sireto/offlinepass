import { Copy } from "@app/components/icons/copy";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { hideString } from "@app/utils/helperUtils";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import { usePassword } from "@app/lib/hooks/use-password";
import Identicon from "react-identicons";
import VariantsAnimation from "@app/animation/variants-animation";
import { useSelector } from "react-redux";
import { selectPasswordProvider } from "@app/store/password/selectors";

const PasswordToast = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const passwordProvider = useSelector(selectPasswordProvider);
  const { passwordHash } = usePassword();
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopyPassword = () => {
    copyToClipboard(passwordHash!);
    toast.success(`Password copied for ${passwordProvider.host}`, {
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
      className={`flex z-20 fixed top-20 sm:top-24 right-0 w-screen bg-[#CDFFD8] lg:w-1/2 xl:w-3/5 text-sm xl:text-base justify-between items-center`}
    >
      <div className="flex items-center px-6  w-full h-full space-x-2 xl:space-x-3 ">
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
      </div>
      <button
        onClick={handleCopyPassword}
        className="h-full px-3 py-3 bg-white"
      >
        <Copy className="h-6 w-6" />
      </button>
    </VariantsAnimation>
  );
};

export default PasswordToast;
