import { Copy } from "@app/components/icons/copy";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import { hideString } from "@app/utils/stringUtils";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import { usePassword } from "@app/lib/hooks/use-password";
import Identicon from "react-identicons";

export const toastVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

const PasswordToast = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { passwordHash } = usePassword();
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopyPassword = () => {
    copyToClipboard(passwordHash!);
    toast.success(`Copied!`, {
      autoClose: 1000,
    });
  };

  // console.log(animalIdenticon("camelmasa").toSvg(64));
  return passwordHash === "" ? (
    <></>
  ) : (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={toastVariants}
      className={`flex z-20 fixed top-24  right-0 w-screen lg:w-1/2 xl:w-3/5 text-sm xl:text-base justify-between items-center`}
    >
      <div className="flex items-center px-6 bg-success w-full h-full xl:space-x-3 ">
        <p className="hidden sm:block font-medium text-[#555555] ">
          Your password has been generated:
        </p>
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
      <button onClick={handleCopyPassword} className="px-3 py-3 bg-white">
        <Copy className="h-6 w-6" />
      </button>
      <div className="absolute top-16 left-4 ">
        <Identicon string={passwordHash} size={25} />
      </div>
    </motion.div>
  );
};

export default PasswordToast;
