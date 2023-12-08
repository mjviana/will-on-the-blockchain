import {Grid, GridItem} from "@chakra-ui/react";
import PublicWillsPage from "./PublicWillsPage";

const HomePage = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"main"
              "footer"`,
          lg: `"main main main"
              "footer footer footer"`,
        }}
      >
        <GridItem pl="2" area={"main"}>
          <PublicWillsPage />
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
