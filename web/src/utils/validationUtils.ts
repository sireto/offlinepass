export const isEmptyString = (value: string | any[]) => value.length === 0;

export const isMskValid = (value: string) => {
  if (
    isContainLowercase(value) &&
    isContainNumber(value) &&
    isContainSpecialCharacter(value) &&
    isContainUppercase(value) &&
    isMinimumCharacter(value)
  ) {
    return true;
  } else {
    return false;
  }
};

export const isContainLowercase = (value: string) => {
  if (value.match(/[a-z]/g)) return true;
  return false;
};

export const isContainUppercase = (value: string) => {
  if (value.match(/[A-Z]/g)) return true;
  return false;
};
export const isContainNumber = (value: string) => {
  if (value.match(/[0-9]/g)) return true;
  return false;
};

export const isContainSpecialCharacter = (value: string) => {
  if (value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) return true;
  return false;
};
export const isMinimumCharacter = (value: string) => {
  if (value.length >= 8) return true;
  return false;
};

export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};
