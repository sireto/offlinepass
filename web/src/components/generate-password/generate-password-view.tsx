import React, { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
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
  const [isMskVerified, setIsMskVerified] = useState(false);
  const { openModal } = useModal();
  const { isLoading, setIsLoading } = useFormStatus();
  const [isSubmit, setSubmit] = useState(false);
  const [generatePswState, setGeneratePswState] = useState<GeneratePswState>({
    msk: "",
    host: "",
    usernameEmail: "",
    date: moment(Date.now()).format("YYYY"),
    retries: 0,
  });
  const isEmpty = (value: string | any[]) => value.length === 0;

  const handleGeneratePassword = async () => {
    setSubmit(true);
    if (isMskVerified) {
      setIsLoading(true);
      if (
        generatePswState.host !== "" &&
        generatePswState.usernameEmail !== ""
      ) {
        await hmacSha256(generatePswState).then((passwordhash) => {
          setIsLoading(false);
          setSubmit(false);
          console.log(generatePswState);
          setGeneratePswState({
            ...generatePswState,
            retries: generatePswState.retries + 1,
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            text: `${passwordhash}`,
            showConfirmButton: false,
          });
        });
      }
      setIsLoading(false);
    } else if (generatePswState.msk !== "") {
      setIsLoading(true);
      setTimeout(() => {
        setIsMskVerified(true);
        setIsLoading(false);
        setSubmit(false);
      }, 1000);
    }
  };

  const mskFormComponent = (
    <>
      <MuiStyledTextField>
        <TextField
          id="input-msk"
          value={generatePswState.msk}
          label="Master Security Key(MSK)"
          variant="outlined"
          fullWidth
          error={isEmpty(generatePswState.msk) && isSubmit}
          disabled={isMskVerified}
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
      <MuiStyledTextField>
        <TextField
          id="host"
          value={generatePswState.host}
          label="Host"
          variant="outlined"
          error={isEmpty(generatePswState.host) && isSubmit}
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              host: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <MuiStyledTextField>
        <TextField
          id="username/email"
          value={generatePswState.usernameEmail}
          label="Username/Email"
          variant="outlined"
          fullWidth
          error={isEmpty(generatePswState.usernameEmail) && isSubmit}
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      {/* <MuiStyledTextField>
        <TextField
          id="date"
          value={generatePswState.date}
          label="Date"
          variant="outlined"
          fullWidth
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              date: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField> */}
      <MuiStyledTextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            renderInput={(props: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField
                fullWidth
                onKeyDown={(e) => e.preventDefault()}
                {...props}
              />
            )}
            label="Date"
            value={generatePswState.date}
            inputFormat="YYYY-MM-DD"
            onChange={(newValue) =>
              setGeneratePswState({
                ...generatePswState,
                date: newValue!,
              })
            }
            disableHighlightToday
          />
        </LocalizationProvider>
      </MuiStyledTextField>
      <MuiStyledTextField>
        <TextField
          id="retries"
          type="number"
          value={generatePswState.retries}
          label="Retries"
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
        <p className="text-sm text-gray-500">
          {generatePasswordViewConstants.description}
        </p>
      </div>

      <div>
        {mskFormComponent}
        {isMskVerified && generatePasswordFormComponent}
      </div>
      <Button
        isLoading={isLoading}
        fullWidth
        onClick={handleGeneratePassword}
        className="text-lg font-medium"
      >
        {isMskVerified ? "Generate Password" : "Done"}
      </Button>
      {/* {passwordHash !== "" && <div className="flex flex-wrap space-x-3 justify-center"> <p className="text-center">{toMidDottedStr(passwordHash)}</p> <Copy onClick={handleCopyPassword} className="h-5 w-5 cursor-pointer"/> </div>} */}
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
