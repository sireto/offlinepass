import * as bip39 from "bip39";

export function generateMsk() {
  const mnemonic = bip39.generateMnemonic();
  const msk = bip39.mnemonicToEntropy(mnemonic);

  return {
    mnemonicWordList: mnemonic.split(" "),
    msk: msk,
  };
}

export function validateMnemonic(mnemonicWordList: string[], msk: string) {
  const mnemonic = bip39.entropyToMnemonic(msk);
  return mnemonic === mnemonicWordList.join(" ");
}
