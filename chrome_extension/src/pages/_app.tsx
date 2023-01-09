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
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Offline Pass</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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
        </PersistGate>
      </Provider>
    </>
  );
}
