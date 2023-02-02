import hmac from "js-crypto-hmac";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { isValidUrl } from "@app/utils/validationUtils";
import { GeneratePswStateDto } from "@app/models/dtos/generate-psw-form-dtos";
const bs58 = require("bs58");

export const hmacSha256 = async (generatePswState: GeneratePswStateDto) => {
  const msg = `${getHostName(
    generatePswState.host
  ).toLowerCase()}|${generatePswState.usernameEmail.toLowerCase()}|${
    generatePswState.date
  }|${checkRetries(generatePswState.retries)}`;
  const hash = "SHA-256";
  const keyUnit8Array = new TextEncoder().encode(generatePswState.msk);
  const msgUnit8Array = new TextEncoder().encode(msg);
  return await hmac
    .compute(keyUnit8Array, msgUnit8Array, hash)
    .then((mac: any) => {
      // now you get a keyed-hash of msg in Uint8Array
      const passwordhash = `${checkRetries(generatePswState.retries)}$${bs58
        .encode(mac)
        .substring(0, 16)}`;
      return passwordhash;
    });
};

const checkRetries = (retries: string) => {
  if (Number.isNaN(parseInt(retries))) {
    return 0;
  } else {
    return retries;
  }
};

export const getHostName = (host: string) => {
  if (!isValidUrl(host)) return host;
  const removeWWW = host.replace("www.", "");
  const addProtocol =
    removeWWW.includes("https://") || removeWWW.includes("http://")
      ? removeWWW
      : "http://".concat(removeWWW);
  return parseUrl(addProtocol).hostname!;
};
