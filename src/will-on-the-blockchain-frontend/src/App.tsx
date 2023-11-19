import {Grid, GridItem} from "@chakra-ui/react";
import Navbar from "./ components/NavBar";
import Wills from "./ components/Wills";
import CreateWill from "./ components/CreateWill";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"header" 
                "main"
                "footer"`,
        lg: `"header header header"
              "main main main"
              "footer footer footer"`,
      }}
    >
      <GridItem pl="2" area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        <Wills />
        <CreateWill />
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
