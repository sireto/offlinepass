export const isInDevelopment = process.env.NODE_ENV === "development";
export const isInProduction = process.env.NODE_ENV === "production";

export const disableLogInProduction = () => {
  if (isInProduction) {
    // eslint-disable-next-line no-multi-assign
    console.log = console.warn = console.error = () => {};
  }
};
