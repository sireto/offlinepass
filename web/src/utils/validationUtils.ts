import _ from "lodash";

/**
 * Validation method to check if the given value is undefined or not.
 * @description - Uses lodash's `isUndefined` method to check the value
 *
 * @param {any} data - Data can be of any type (string, number,...)
 *
 * @returns {boolean} - Returns true if value is undefined, else false
 */
export function isUndefined(data: unknown): boolean {
  return _.isUndefined(data);
}

/**
 * Validation method to check if the given value is null or not.
 * @description - Uses lodash's `isNull` method to check the value
 *
 * @param {any} data - Data can be of any type (string, number,...)
 *
 * @returns {boolean} - Returns true if value is null, else false
 */
export function isNull(data: unknown): boolean {
  return _.isNull(data);
}

/**
 * Validation method to check if the given value is neither undefined nor null.
 * @description - Uses another validation helper method `isUndefined` and `isNull`.
 *
 * @see isUndefined
 * @see isNull
 *
 * @param {any} data - Data can be of any type (string, number,...)
 *
 * @returns {boolean} - Returns true if value is neither undefined nor null, else false
 */
export function isNetherUndefinedNorNull(data: unknown): boolean {
  return !isUndefined(data) && !isNull(data);
}

export const isEmpty = (value: string | any[]) => value.length === 0;
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
