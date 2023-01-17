import '@/styles/globals.scss'
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
