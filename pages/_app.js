import '@/styles/globals.css'
import {LoadingContextProvider} from "@/store/loading-context";
import Layout from "@/layout/layout";
export default function App({ Component, pageProps }) {
  return (
    <LoadingContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoadingContextProvider>
    )
}
