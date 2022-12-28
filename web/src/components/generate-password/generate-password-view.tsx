import React, { useState } from "react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import Button from "../ui/button/button";
import { useFormStatus } from "@app/lib/hooks/use-form-status";
import AnchorLink from "../ui/links/anchor-link";
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
  const { isLoading, setIsLoading } = useFormStatus();
  const [generatePswState, setGeneratePswState] = useState<GeneratePswState>({
    msk: "",
    host: "",
    usernameEmail: "",
    date: "",
    retries: 0,
  });

  const handleGeneratePassword = () => {
    if (isMskVerified) {
      console.log("Password generated");
    } else if (generatePswState.msk !== "") {
      setIsLoading(true);
      setTimeout(() => {
        setIsMskVerified(true);
        setIsLoading(false);
      }, 2000);
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
          onChange={(event) =>
            setGeneratePswState({
              ...generatePswState,
              usernameEmail: event.currentTarget.value,
            })
          }
        />
      </MuiStyledTextField>
      <MuiStyledTextField>
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
