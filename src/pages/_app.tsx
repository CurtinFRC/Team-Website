import '../styles/globals.scss'
import Layout from "../components/Layout.tsx";
import Signature from "../components/Signature.tsx";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Head>
        <link
            rel="icon"
            type="image/png"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#ec008c"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta
            name="msapplication-TileColor"
            content="#0f0f0f"
          />
          <meta name="theme-color" content="#0f0f0f" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover,maximum-scale=1"
          />
          <meta name="darkreader-lock" />
          <meta
            name="keywords"
            content="Team, 4788, FRC, Curtin University, Robotics, Club, Sponsors, Socials, WARP, STEM"
          />
          <meta key="robots" name="robots" content="index,follow" />
          <meta key="googlebot" name="googlebot" content="index,follow" />\
      </Head>
      <Layout>
        <Signature />
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
