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
              "aside footer footer"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem p={5} bg="blackAlpha.900" area="aside" h="100vh">
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
