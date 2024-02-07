import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme.ts";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {sepolia} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {RouterProvider} from "react-router-dom";
import router from "./routes.tsx";
import walletTheme from "./ConnectButtonTheme.ts";

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
  persister: null,
});

console.log("theme", theme);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider theme={theme}>
        <RainbowKitProvider coolMode chains={chains} theme={walletTheme}>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
