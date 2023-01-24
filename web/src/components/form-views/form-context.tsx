import { atom, useAtom } from "jotai";
import moment from "moment";

const formContextAtom = atom({
  passwordHash: "",
  isMskVisible: false,
  visitorId: "",
  generatePswState: {
    msk: "",
    host: "",
    usernameEmail: "",
    date: moment(Date.now()).format("YYYY"),
    retries: "0",
  },
});

export default function useFormContext() {
  const [formContext, setFormContext] = useAtom(formContextAtom);
  return { formContext, setFormContext };
}
