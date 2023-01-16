import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Component {...pageProps} />
    </div>
  )
}
