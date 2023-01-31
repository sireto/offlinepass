import { passwordState } from "@app/components/textfield/MuiTextField";

export const generateMskViewConstants = {
  title: "Generate Master Password",
  description:
    "Please remember the following phrases and Keep it in safe place. It will be used for your Master Password recovery",
};

export const verifyMskViewConstants = {
  title: "Verify Master Password",
  description: "Choose the seeds in the correct order.",
};

export const generatePasswordViewConstants = {
  title: "Your Offline Password",
  description:
    "Password will be generated based on your master password when you fill up the other details.",
};

export const formTitleConstants = {
  SECURITY_KEY: "Master Password",
  HOST: "Host or URL",
  USERNAME_EMAIL: "Username or Email Address",
  YEAR: "Year",
  RETRIES: "No of password changes in ",
};

export const formIds = {
  MSK: "msk",
  HOST: "host",
  USERNAME_EMAIL: "usernameEmail",
  DATE: "date",
  RETRIES: "retries",
};

export const storeOptionToolTipConstants = {
  SECURITY_KEY: "Save encrypted password on localstorage",
  HOST: "Save host or URL on localstorage",
  USERNAME_EMAIL: "Save username or email on localstorage ",
};
