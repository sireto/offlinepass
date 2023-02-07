import { atom, useAtom } from "jotai";

const passwordAtom = atom("");

export function usePassword() {
  const [passwordHash, setPasswordHash] = useAtom(passwordAtom);

  return { passwordHash, setPasswordHash };
}
