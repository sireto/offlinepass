import React, { useEffect, useState } from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import styled from "@emotion/styled";
import Button from "../ui/button/button";
import { useFormStatus } from "@app/lib/hooks/use-form-status";
import AnchorLink from "../ui/links/anchor-link";
import { hmacSha256 } from "@app/utils/hmac";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { useModal } from "../modal-views/context";
import { generatePasswordViewConstants } from "@app/constants/form-view-constants";
import Swal from "sweetalert2";
import { toMidDottedStr } from "@app/utils/stringUtils";
import { Copy } from "../icons/copy";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import { toast } from "react-toastify";
import { Eye } from "../icons/eye";
import { EyeSlash } from "../icons/eyeslash";
import { ChevronDown } from "../icons/chevrondown";
import Dropdown from "../dropdown";

const MuiStyledTextField = styled.div`
  margin-bottom: 12px;
`;

interface GeneratePswState {
  msk: string;
  host: string;
  usernameEmail: string;
  date: string;
  retries: number;
}

export default function GeneratePasswordView() {
  const [isMskVerified, setIsMskVerified] = useState(true);
  // const { openModal } = useModal();
  const [passwordHash, setPasswordHash] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [generatePswState, setGeneratePswState] = useState<GeneratePswState>({
    msk: "",
    host: "",
    usernameEmail: "",
    date: moment(Date.now()).format("YYYY"),
    retries: 0,
  });
  const isEmpty = (value: string | any[]) => value.length === 0;
  const isMskValid = (value: string) => {
    if (
      value.match(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/) &&
      !isEmpty(value)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyPassword = () => {
    copyToClipboard(passwordHash!);
    toast.success(`Copied! ${passwordHash} `, {
      autoClose: 1000,
    });
  };
  useEffect(() => {
    if (
      !isEmpty(generatePswState.host) &&
      !isEmpty(generatePswState.usernameEmail) &&
      isMskValid(generatePswState.msk)
    ) {
      handleGeneratePassword();
    }
    else {
      setPasswordHash("");
    }
  }, [generatePswState]);

  const handleGeneratePassword = async () => {
    if (isMskVerified) {
      if (
        generatePswState.host !== "" &&
        generatePswState.usernameEmail !== "" &&
        generatePswState.msk !== ""
      ) {
        await hmacSha256(generatePswState).then((passwordhash) => {
          setPasswordHash(passwordhash);

          // Swal.fire({
          //   position: "top-end",
          //   icon: "success",
          //   title: "Your work has been saved",
          //   text: `${passwordhash}`,
          //   showConfirmButton: false,
          // });
        });
      }
    } else if (generatePswState.msk !== "") {
      setTimeout(() => {
        setIsMskVerified(true);
      }, 1000);
    }
  };

  const mskFormComponent = (
    <>
      <p className=" font-medium mb-2">Security Key</p>
      <MuiStyledTextField>
        <TextField
          id="input-msk"
          value={generatePswState.msk}
          type={isPasswordVisible ? "text" : "password"}
          helperText={ !isEmpty(generatePswState.msk) && !isMskValid(generatePswState.msk)?"Security key must contain lowercase letter,uppercase letter,number,special character and at least 8 characters":""}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {isPasswordVisible ? (
                  <Eye
                    onClick={() => {
                      setPasswordVisible(false);
                    }}
                    className="h-6 w-6 cursor-pointer"
                  />
                ) : (
                  <EyeSlash
                    onClick={() => {
                      setPasswordVisible(true);
                    }}
                    className="h-6 w-6 cursor-pointer"
                  />
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
          error={
            isEmpty(generatePswState.msk)
              ? false
              : !isMskValid(generatePswState.msk)
          }
          // disabled={isMskVerified}
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              msk: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
    </>
  );

  const generatePasswordFormComponent = (
    <>
      <p className=" font-medium mb-2">Host</p>
      <MuiStyledTextField>
        <TextField
          id="host"
          value={generatePswState.host}
          placeholder="eg. Facebook.com"
          variant="outlined"
          // error={isEmpty(generatePswState.host)}
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              host: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <p className="  font-medium mb-2">Username/Email</p>
      <MuiStyledTextField>
        <TextField
          id="username/email"
          value={generatePswState.usernameEmail}
          placeholder="eg. abc or abc@example.com"
          variant="outlined"
          fullWidth
          // error={isEmpty(generatePswState.usernameEmail)}
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <p className="  font-medium mb-2">Year</p>
      <Dropdown
        generatePswState={generatePswState}
        setGeneratePswState={setGeneratePswState}
      />
      <p className="  font-medium mb-2">No of password changes</p>
      <MuiStyledTextField>
        <TextField
          id="retries"
          type="number"
          value={generatePswState.retries}
          variant="outlined"
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              retries: parseInt(event.currentTarget.value),
            })
          }
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </MuiStyledTextField>
    </>
  );
  return (
    <div className="w-full h-full space-y-8">
      <div className="flex flex-col items-center space-y-2">
        <p className="font-bold text-2xl">
          {generatePasswordViewConstants.title}
        </p>
        {/* <p className="text-sm text-gray-500">
          {generatePasswordViewConstants.description}
        </p> */}
      </div>

      <div>
        {mskFormComponent}
        {isMskVerified && generatePasswordFormComponent}
      </div>
      {/* <Button
        isLoading={isLoading}
        fullWidth
        onClick={handleGeneratePassword}
        className="text-lg font-medium"
      >
        {isMskVerified ? "Generate Password" : "Done"}
      </Button> */}
      {passwordHash !== "" && (
        <div className="flex flex-wrap space-x-3 justify-center items-center">
          <p className=" font-bold text-xl">Password</p>
          <p className="text-center font-bold text-2xl px-3 my-2 text-brand py-1 bg-slate-100 rounded-lg">
            {passwordHash}
          </p>
          <Button
            className="px-3 py-1 text-center text-lg bg-brand"
            onClick={handleCopyPassword}
          >
            Copy
          </Button>
        </div>
      )}
      {!isMskVerified && (
        <p className="text-sm text-gray-500">
          Don't have MSK?{" "}
          <AnchorLink href={"/msk/generate"} className="text-red-400">
            Generate one
          </AnchorLink>
        </p>
      )}
    </div>
  );
}
