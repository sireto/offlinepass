import "../../styles/globals.css";
import "../../styles/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "@app/layouts/_layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@app/store/store";
import ModalContainer from "@app/components/modal-views/container";
import Seo from "@app/components/seo";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
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
      <Layout>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Component {...pageProps} />
            <ModalContainer />
          </PersistGate>
        </Provider>
      </Layout>
    </>
  );
}
