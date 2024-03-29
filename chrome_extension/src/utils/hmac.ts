import { GeneratePswStateDtos } from "@app/models/dtos/generatepsw";
import hmac from "js-crypto-hmac";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { isValidUrl } from "@app/utils/validationUtils";
const bs58 = require("bs58");
export const hmacSha256 = async (generatePswState: GeneratePswStateDtos) => {
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
      console.log(passwordhash);
      return passwordhash;
      //   console.log(new TextDecoder("utf-8").decode(mac));
    });
};

const checkRetries = (retries: number) => {
  if (Number.isNaN(retries)) {
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
