import { selectPasswordProvider } from "@app/store/password/selectors";
import { atom, useAtom } from "jotai";
import moment from "moment";
const generatePasswordAtom = atom({
  msk: "",
  host: "",
  usernameEmail: "",
  date: moment(Date.now()).format("YYYY"),
  retries: "0",
});

export function useGeneratePasswordState() {
  const [generatePswState, setGeneratePswState] = useAtom(generatePasswordAtom);

  return { generatePswState, setGeneratePswState };
}
