import React from 'react'
import Web3Provider from "context/Web3Context"
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { MoralisProvider } from "react-moralis";

const App = ({ Component, pageProps }) => {
  if (!process.env.MORALIS_APPLICATION_ID || !process.env.MORALIS_SERVER_ID) {
    return (

      <ChakraProvider resetCSS theme={theme}>
          <h3>Moralis App_ID and Server_ID has not been set:</h3>
          <p>
            Follow the steps on the <a href="https://docs.moralis.io/getting-started/quick-start" target="_blank">Moralis documentation</a> to create a new Moralis project.
            Then find your application's app id and server id and paste them in a root <b>.env</b> file for both <b>.env.development</b> and <b>.env.production</b> like so:
          </p>
          <pre>
            <code>
              MORALIS_APPLICATION_ID='[APP_ID]'<br/>
              MORALIS_SERVER_ID='[SERVER_ID]'
            </code>
          </pre>
      </ChakraProvider>
    )
  }
  return (
    <MoralisProvider appId={process.env.MORALIS_APPLICATION_ID || ""} serverUrl={process.env.MORALIS_SERVER_ID || ""}>
      <Web3Provider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Web3Provider>
    </MoralisProvider>
  );
}

export default App;