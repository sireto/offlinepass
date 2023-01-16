import { atom, useAtom } from "jotai";
const visitorIdAtom = atom("");

export default function useVisitorId() {
  const [visitorId, setVisitorId] = useAtom(visitorIdAtom);
  return { visitorId, setVisitorId };
}
