import React, { useEffect, useState } from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import styled from "@emotion/styled";
import Button from "@app/components/ui/button/button";
import { hmacSha256 } from "@app/utils/hmac";
import moment from "moment";
import { generatePasswordViewConstants } from "@app/constants/form-view-constants";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import { toast } from "react-toastify";
import { Eye } from "@app/components/icons/eye";
import { EyeSlash } from "@app/components/icons/eyeslash";
import Dropdown from "@app/components/year_dropdown";
import { isEmpty, isMskValid } from "@app/utils/validationUtils";
import { FormContent } from "@app/models/enums/formEnums";
import { GeneratePswStateDtos } from "@app/models/dtos/generatepsw";
import { useDispatch, useSelector } from "react-redux";
import { selectPasswordProvider } from "@app/store/password/selectors";
import { setPasswordProvider } from "@app/store/password/passwordSlice";

const MuiStyledTextField = styled.div`
  margin-bottom: 12px;
`;

export default function GeneratePasswordView() {
  // const [isMskVerified, setIsMskVerified] = useState(true);
  const [passwordHash, setPasswordHash] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [generatePswState, setGeneratePswState] =
    useState<GeneratePswStateDtos>({
      msk: "",
      host: "",
      usernameEmail: "",
      date: moment(Date.now()).format("YYYY"),
      retries: 0,
    });

  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyPassword = () => {
    copyToClipboard(passwordHash!);
    toast.success(`Copied! ${passwordHash} `, {
      autoClose: 1000,
    });
  };
  const dispatch = useDispatch();
  const passwordProvider = useSelector(selectPasswordProvider);

  useEffect(() => {
    if (
      !isEmpty(generatePswState.host) &&
      !isEmpty(generatePswState.usernameEmail) &&
      isMskValid(generatePswState.msk)
    ) {
      handleGeneratePassword();
    } else {
      setPasswordHash("");
    }
  }, [generatePswState]);

  const handleGeneratePassword = async () => {
    hmacSha256(generatePswState).then((passwordhash) => {
      setPasswordHash(passwordhash);
      dispatch(
        setPasswordProvider({
          msk: generatePswState.msk,
          host: passwordProvider.host,
          usernameEmail: passwordProvider.usernameEmail,
          year: passwordProvider.year,
          retries: passwordProvider.retries,
        })
      );
    });
  };

  const mskFormComponent = (
    <>
      <p className="font-medium mb-2">{FormContent.SECURITY_KEY}</p>
      <MuiStyledTextField>
        <TextField
          id="input-msk"
          value={generatePswState.msk}
          type={isPasswordVisible ? "text" : "password"}
          helperText={
            !isEmpty(generatePswState.msk) && !isMskValid(generatePswState.msk)
              ? "Security key must contain lowercase letter,uppercase letter,number,special character and at least 8 characters"
              : ""
          }
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
      <p className="font-medium mb-2">{FormContent.HOST}</p>
      <MuiStyledTextField>
        <TextField
          id="host"
          value={generatePswState.host}
          placeholder="eg. Facebook.com"
          variant="outlined"
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              host: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <p className="font-medium mb-2">{FormContent.USERNAME_EMAIL}</p>
      <MuiStyledTextField>
        <TextField
          id="username/email"
          value={generatePswState.usernameEmail}
          placeholder="eg. abc or abc@example.com"
          variant="outlined"
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <p className="font-medium mb-2">{FormContent.YEAR}</p>
      <Dropdown
        generatePswState={generatePswState}
        setGeneratePswState={setGeneratePswState}
      />
      <p className="font-medium mb-2">{FormContent.RETRIES}</p>
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
        {generatePasswordFormComponent}
      </div>
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
      {/* {!isMskVerified && (
        <p className="text-sm text-gray-500">
          Don't have MSK?{" "}
          <AnchorLink href={"/msk/generate"} className="text-red-400">
            Generate one
          </AnchorLink>
        </p>
      )} */}
    </div>
  );
}
