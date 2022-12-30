import "../../styles/globals.css";
import "../../styles/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "@app/layouts/_layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalContainer from "@app/components/modal-views/container";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        theme="colored"
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
