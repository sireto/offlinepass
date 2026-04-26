import { MskErrorEnums } from "@app/models/enums/errorEnums";
import * as CryptoJS from "crypto-js";
import {
  isContainLowercase,
  isContainNumber,
  isContainSpecialCharacter,
  isContainUppercase,
  isMinimumCharacter,
} from "./validationUtils";

const PBKDF2_ITERATIONS = 250000;
const KEY_LENGTH_BITS = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

export const checkMskValidation = (error: MskErrorEnums, msk: string) => {
  switch (error) {
    case MskErrorEnums.LOWERCASE:
      return isContainLowercase(msk);
    case MskErrorEnums.UPPERCASE:
      return isContainUppercase(msk);
    case MskErrorEnums.NUMBER:
      return isContainNumber(msk);
    case MskErrorEnums.SPECIAL_CHARACTER:
      return isContainSpecialCharacter(msk);
    case MskErrorEnums.LENGTH:
      return isMinimumCharacter(msk);
    default:
      return false;
  }
};

const toBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const fromBase64 = (b64: string): Uint8Array => {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const deriveKey = async (
  pin: string,
  salt: Uint8Array
): Promise<CryptoKey> => {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pin),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: KEY_LENGTH_BITS },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encryptMsk = async (
  plaintext: string,
  pin: string
): Promise<string> => {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(pin, salt);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(plaintext)
    )
  );
  const blob = new Uint8Array(salt.length + iv.length + ciphertext.length);
  blob.set(salt, 0);
  blob.set(iv, salt.length);
  blob.set(ciphertext, salt.length + iv.length);
  return toBase64(blob);
};

export const decryptMsk = async (
  blob: string,
  pin: string
): Promise<string | null> => {
  if (!blob || !pin) return null;
  try {
    const bytes = fromBase64(blob);
    if (bytes.length < SALT_LENGTH + IV_LENGTH) return null;
    const salt = bytes.slice(0, SALT_LENGTH);
    const iv = bytes.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const ciphertext = bytes.slice(SALT_LENGTH + IV_LENGTH);
    const key = await deriveKey(pin, salt);
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(plaintext);
  } catch {
    return null;
  }
};

export const isLegacyEncryptedMsk = (blob: string): boolean => {
  return blob.startsWith("U2FsdGVkX1");
};

export const stringTosha256 = (data: string) => {
  if (data === "") return "";
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

export const repeatPinError = (
  pin: Array<string>,
  repeatPin: Array<string>
) => {
  if (pin.toString() === repeatPin.toString() || repeatPin.includes(""))
    return "";
  return "Pin Mismatch";
};

export const pinError = (
  pin: Array<string>,
  isSave: boolean,
  wrongPin: boolean
) => {
  if (pin.includes("") || isSave) return "";
  if (wrongPin) return "Wrong Pin";
  return "";
};
