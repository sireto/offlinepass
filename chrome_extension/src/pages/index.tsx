import FormContainer from "@app/components/form-views/container";
import type { NextPage } from "next";
import PasswordToast from "@app/components/ui/password-toast";
const Home: NextPage = () => {
  return (
    <main className="py-4 bg-white h-full">
      <section>
        <FormContainer className="w-full h-full" />
      </section>
    </main>
  );
};

export default Home;
