import {ChakraProvider} from "@chakra-ui/react";
import theme from "./themes/theme.ts";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {sepolia} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
  walletDarkTheme,
  walletLightTheme,
} from "./themes/connectButtonTheme.ts";
import Layout from "./pages/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import CreateWillPage from "./pages/CreateWillPage.tsx";
import HowToCreateWillPage from "./pages/HowToCreateWillPage.tsx";
import PublicWillsPage from "./pages/PublicWillsPage.tsx";
import RevokeWillPage from "./pages/RevokeWillPage.tsx";
import SearchWillPage from "./pages/SearchWillPage.tsx";
import React, {useMemo, useState} from "react";

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

const Root = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: (
          <Layout
            onColorModeSwitchClicked={() => setIsDarkTheme(!isDarkTheme)}
          />
        ),
        children: [
          {index: true, element: <HomePage />},
          {
            path: "/create-will",
            element: <CreateWillPage />,
          },
          {path: "/public-wills", element: <PublicWillsPage />},
          {path: "/how-to-create-will", element: <HowToCreateWillPage />},
          {path: "/search-will", element: <SearchWillPage />},
          {path: "/revoke-will", element: <RevokeWillPage />},
        ],
      },
    ]);
  }, [isDarkTheme]);

  return (
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <ChakraProvider theme={theme}>
          <RainbowKitProvider
            coolMode
            chains={chains}
            theme={isDarkTheme ? walletDarkTheme : walletLightTheme}
          >
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </ChakraProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
};

export default Root;
