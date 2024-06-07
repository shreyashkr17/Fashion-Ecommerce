import { useEffect } from "react";
import Helmet from "react-helmet";
import { useStore } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store/index.js";
import Layout from "../components/layout";

import { actions as demoAction } from "../store/demo";
import ErrorBoundary from './ErrorBoundary.jsx' 

import "~/public/scss/plugins/owl-carousel/owl.carousel.scss";
import "~/public/scss/style.scss";
import "~/public/css/cartier.css";
import FaviconICO from "~/assets/favicon.ico";
import Favicon16 from "~/assets/favicon-16x16.png";
import Favicon32 from "~/assets/favicon-32x32.png";
import AppleTouch from "~/assets/apple-touch-icon.png";
import { isInstgramView } from "~/utils";

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore();
  useEffect(() => {
    if(isInstgramView()){
      window._AutofillCallbackHandler = window._AutofillCallbackHandler || function () {};
    }

    if (store.getState().demo.current != process.env.NEXT_PUBLIC_DEMO) {
      store.dispatch(demoAction.refreshStore(process.env.NEXT_PUBLIC_DEMO));
    }
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate
          persistor={store.__persistor}
          loading={
            <div className="loading-overlay">
              <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          }
        >
          <Helmet>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="keywords" content="Ireti Ensemble" />
            <meta
              name="description"
              content="Ireti Ensemble - A Fashion Brand"
            />
            <meta name="author" content="Ensemble" />
            <meta name="apple-mobile-web-app-title" content="Ireti" />
            <meta name="application-name" content="Ireti Ensemble" />
            <meta name="msapplication-TileColor" content="#cc9966" />
            <meta
              name="msapplication-config"
              content="images/icons/browserconfig.xml"
            />
            <meta name="theme-color" content="#ffffff" />
            <title>Ireti Ensemble - A Fashion Brand</title>
            <link rel="apple-touch-icon" sizes="180x180" href={AppleTouch} />
            <link rel="icon" type="image/png" sizes="32x32" href={Favicon16} />
            <link rel="icon" type="image/png" sizes="16x16" href={Favicon32} />
            <link rel="icon" type="image/png" sizes="16x16" href={Favicon32} />
            <link rel="manifest" href="images/icons/site.webmanifest" />
            <link
              rel="mask-icon"
              href="images/icons/safari-pinned-tab.svg"
              color="#666666"
            />
            <link rel="shortcut icon" href={FaviconICO} />
            <meta
              name="description"
              content="Shop the latest trends in women's premium dresses. Discover new trending, seasonal dresses, hand-embroidered designs, tailored fit, and perfect for layering. Ireti Ensemble offers exclusive fashion for every occasion."
            />
            <meta
              name="keywords"
              content="women's dresses, premium dresses, trending dresses, seasonal dresses, hand-embroidered dresses, tailored fit dresses, layering dresses, Ireti Ensemble, fashion, women's fashion, clothing"
            />
            <meta name="author" content="Ireti Ensemble" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta
              property="og:title"
              content="Ireti Ensemble | Premium Women's Dresses"
            />
            <meta
              property="og:description"
              content="Shop the latest trends in women's premium dresses. Discover new trending, seasonal dresses, hand-embroidered designs, tailored fit, and perfect for layering. Ireti Ensemble offers exclusive fashion for every occasion."
            />
            <meta property="og:image" content={Favicon16} />
            <meta property="og:url" content="https://www.iretiensemble.com" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="Ireti Ensemble | Premium Women's Dresses"
            />
            <meta
              name="twitter:description"
              content="Shop the latest trends in women's premium dresses. Discover new trending, seasonal dresses, hand-embroidered designs, tailored fit, and perfect for layering. Ireti Ensemble offers exclusive fashion for every occasion."
            />
            <meta name="twitter:image" content={Favicon16} />
            <link rel="icon" href={Favicon32} />
          </Helmet>

          <ErrorBoundary>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(WrappedApp);
