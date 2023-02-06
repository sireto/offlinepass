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
import { NextSeo } from "next-seo";
import globalConstants from "@app/constants/global";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title={globalConstants.title}
        description={globalConstants.appDesc}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://offlinepass.com/",
          site_name: "OfflinePass",
          description: "Self service password manager",
          title: globalConstants.title,
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
        twitter={{
          handle: globalConstants.twitterHandle,
          site: globalConstants.url,
          cardType: "summary_large_image",
        }}
        facebook={{
          appId: "1234567890",
        }}
      />

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
