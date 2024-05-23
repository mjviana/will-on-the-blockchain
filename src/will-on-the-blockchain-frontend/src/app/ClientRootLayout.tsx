"use client";

import {Box, Grid, GridItem, Show} from "@chakra-ui/react";
import Providers from "./Providers";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import {type State} from "wagmi";
import {useState} from "react";

type ClientRootLayoutProps = {
  children: React.ReactNode;
  initialState: State | undefined;
};

export default function ClientRootLayout({
  children,
  initialState,
}: ClientRootLayoutProps) {
  function onColorModeSwitchClicked(): void {
    setIsDarkTheme((prev) => !prev);
  }

  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <div id="root">
      <Providers isDarkTheme={isDarkTheme} initialState={initialState}>
        <Navbar onColorModeSwtchClicked={onColorModeSwitchClicked} />
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: `"aside main main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "250px 1fr",
          }}
        >
          <Show above="lg">
            <GridItem area="aside" h="100vh">
              <Sidebar />
            </GridItem>
          </Show>
          <GridItem pl="2" area={"main"}>
            <Box p={5}>{children}</Box>
          </GridItem>
        </Grid>
      </Providers>
    </div>
  );
}
