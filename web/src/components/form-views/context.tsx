import { atom, useAtom } from "jotai";

const formContextAtom = atom({
  formProps: null,
});

export default function useFormContext() {
  const [state, setState] = useAtom(formContextAtom);
  const setFormProps = (formProps: any) => {
    setState({ formProps });
  };
  return { ...state, setFormProps };
}
