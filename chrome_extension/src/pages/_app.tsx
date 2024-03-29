import "../../styles/globals.css";
import "../../styles/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, { persistor } from "@app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import ModalContainer from "@app/components/modal-views/container";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        theme="colored"
        className="text-xs"
        position="bottom-right"
        autoClose={1000}
        style={{ width: "250px" }}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
          <ModalContainer />
        </PersistGate>
      </Provider>
    </>
  );
}
