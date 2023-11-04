import {Grid, GridItem, Show} from "@chakra-ui/react";
import Navbar from "./ components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"header" 
                "main"
                "footer"`,
        lg: `"header header"
              "aside main"
              "footer footer"`,
      }}
    >
      <GridItem pl="2" area={"header"}>
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"aside"}>
          Aside
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
