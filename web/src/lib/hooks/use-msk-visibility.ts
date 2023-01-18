import { atom, useAtom } from "jotai";

const mskVisibilityAtom = atom(false);

export default function useMskVisibility() {
  const [isMskVisible, setMskVisiblity] = useAtom(mskVisibilityAtom);
  return { isMskVisible, setMskVisiblity };
}
