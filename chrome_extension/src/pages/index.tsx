import type { NextPage } from "next";
import GeneratePasswordView from "@app/components/form-views/generate-password-view";

const Home: NextPage = () => (
  <main className="bg-white font-inter">
    <GeneratePasswordView />
  </main>
);

export default Home;
