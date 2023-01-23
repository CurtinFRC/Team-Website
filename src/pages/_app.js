import '@/styles/globals.scss'
import Layout from "@/components/Layout";
import Signature from "@/components/Signature";

export default function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Layout>
        <Signature />
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
