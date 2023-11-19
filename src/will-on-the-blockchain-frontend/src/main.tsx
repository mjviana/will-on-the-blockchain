import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
import App from "./App.tsx";
import theme from "./theme.ts";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {sepolia} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";

const WALLET_CONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "";
const ALCHEMY_PROVIDER_API_KEY =
  import.meta.env.VITE_ALCHEMY_PROVIDER_API_KEY || "";

const {chains, publicClient} = configureChains(
  [sepolia],
  [alchemyProvider({apiKey: ALCHEMY_PROVIDER_API_KEY})]
);

const {connectors} = getDefaultWallets({
  appName: "Will on the Blockchain",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider theme={theme}>
        <RainbowKitProvider
          chains={chains}
          theme={{
            lightMode: lightTheme(),
            darkMode: midnightTheme(),
          }}
        >
          <App />
        </RainbowKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <MoralisProvider initializeOnMount={false}>
//       <ChakraProvider theme={theme}>
//         <ColorModeScript initialColorMode={theme.config.initialColorMode} />
//         <App />
//       </ChakraProvider>
//     </MoralisProvider>
//   </React.StrictMode>
// );
