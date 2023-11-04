import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import {MoralisProvider} from "react-moralis";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);
