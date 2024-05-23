"use client";

// import React, {useMemo, useState} from "react";
// import React, { useState} from "react";
import {type State, WagmiProvider} from "wagmi";
import {rainbowConfig} from "../lib/config";
import theme from "../themes/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {RainbowKitProvider, darkTheme} from "@rainbow-me/rainbowkit";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
  initialState: State | undefined;
};

const Providers = ({children, initialState}: ProvidersProps) => {
  return (
    <WagmiProvider config={rainbowConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <RainbowKitProvider theme={darkTheme()}>
            {/* <RouterProvider router={router} /> */}
            {children}
          </RainbowKitProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
