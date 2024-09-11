import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      // appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      // serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_ID}
      appId="CD5vC1zbiCvrZOb17ywA1XowV4ew5rnpouSADnAY"
      serverUrl="https://akyfitfpyyzy.usemoralis.com:2053/server"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
