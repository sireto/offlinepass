import { generatePswStateDtos } from "@app/models/dtos/generatepsw";
import hmac from "js-crypto-hmac";
const bs58 = require("bs58");
export const hmacSha256 = async (generatePswState: generatePswStateDtos) => {
  const msg = `${generatePswState.host}|${generatePswState.usernameEmail}|${generatePswState.date}|${generatePswState.retries}`;
  const hash = "SHA-256";
  const keyUnit8Array = new TextEncoder().encode(generatePswState.msk);
  const msgUnit8Array = new TextEncoder().encode(msg);
  return await hmac
    .compute(keyUnit8Array, msgUnit8Array, hash)
    .then((mac: any) => {
      // now you get a keyed-hash of msg in Uint8Array
      const passwordhash = `${generatePswState.retries}$${bs58.encode(mac)}`;
      return passwordhash;
      //   console.log(new TextDecoder("utf-8").decode(mac));
    });
};
