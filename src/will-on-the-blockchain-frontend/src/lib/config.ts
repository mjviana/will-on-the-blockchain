"use client";

import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {sepolia} from "viem/chains";
import {cookieStorage, createStorage, http} from "wagmi";

const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";
// const ALCHEMY_PROVIDER_API_KEY =
//   process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER_API_KEY || "";

// new config required for RainbowKit
const rainbowConfig = getDefaultConfig({
  appName: "Will on the Blockchain",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/2a0xlncxDdUUA4dz99rp5bPZzBnkRuU_"
    ),
  },
});

export {rainbowConfig};
