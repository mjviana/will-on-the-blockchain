import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import {Box, Grid, GridItem, Show} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <>
      <Navbar />
      <Grid
        templateAreas={{
          base: `"main"
                "footer"`,
          lg: `"aside main main"
              "footer footer footer"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <Sidebar />
          </GridItem>
        </Show>
        <GridItem pl="2" area={"main"}>
          <Box p={5}>
            <Outlet />
          </Box>
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
}

export default Layout;
