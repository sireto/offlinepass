import "../../styles/globals.css";
import "../../styles/tailwind.css";
import "swiper/css/bundle";
import type { AppProps } from "next/app";
import Layout from "@app/layouts/_layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@app/store/store";
import Script from "next/script";
import ModalContainer from "@app/components/modal-views/container";
import Cookie from "@app/components/cookie";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OfflinePass</title>
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-FGMGC6TQ6L"
      ></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FGMGC6TQ6L', {
              page_path: window.location.pathname,
            });
        `,
        }}
      />
      <Cookie />
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
