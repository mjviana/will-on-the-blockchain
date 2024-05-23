"use client";

// import React, {useMemo, useState} from "react";
// import React, { useState} from "react";
import {type State, WagmiProvider} from "wagmi";
import {rainbowConfig} from "../lib/config";
import theme from "../themes/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {walletDarkTheme, walletLightTheme} from "../themes/connectButtonTheme";

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
  initialState: State | undefined;
  isDarkTheme: boolean;
};

const Providers = ({children, initialState, isDarkTheme}: ProvidersProps) => {
  return (
    <WagmiProvider config={rainbowConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={isDarkTheme ? walletDarkTheme : walletLightTheme}
        >
          <ChakraProvider theme={theme}>
            {/* <RouterProvider router={router} /> */}
            {children}
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
