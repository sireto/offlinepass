import "../../styles/globals.css";
import "../../styles/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "@app/layouts/_layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import store, { persistor } from "@app/store/store";
import Script from "next/script";
import Link from "next/link";
import CookieConsent from "react-cookie-consent";
import { disableLogInProduction } from "@app/utils/disableConsoleUtils";

disableLogInProduction();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OfflinePass</title>
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FGMGC6TQ6L"
      ></script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FGMGC6TQ6L');
        `,
        }}
      />
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
          </PersistGate>
        </Provider>
      </Layout>
      <CookieConsent
        location="bottom"
        cookieName="OfflinePassCookies"
        expires={999}
        buttonStyle={{
          marginRight: 90,
        }}
      >
        This website uses cookies to enhance the user experience.
        <Link href="https://www.termsfeed.com/blog/cookies/">
          <a className=" text-blue-500 pl-3  " target="_blank">
            Learn More
          </a>
        </Link>
      </CookieConsent>
    </>
  );
}
