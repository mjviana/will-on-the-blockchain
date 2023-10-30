import "dotenv/config";

export function nodeUrl(networkName: string): string {
  if (networkName) {
    // Gets a URI (Uniform Resource Identifier) of the environment variable based on the network name
    const uri = process.env["ETH_NODE_URI_" + networkName.toUpperCase()];
    console.log("uri: ", uri);

    // Checks if the URI exists and is not empty
    if (uri && uri !== "") {
      return uri;
    }
  }

  // If the specific URI for the network was not found, get the default URI from the environment variable
  let uri = process.env.ETH_NODE_URI;

  // Replaces the string "{{networkName}}" in the default URI with the network name, if present
  if (uri) {
    uri = uri.replace("{{networkName}}", networkName);
  }

  // Checks if the URI is empty or undefined
  if (!uri || uri === "") {
    // If the network name is "localhost", returns a specific URI
    if (networkName === "localhost") {
      return "http://localhost:8545";
    }

    // Otherwise, it returns an empty string, indicating that the URI was not found
    return "";
  }

  // Checks if the URI contains the string "{{", indicating that the network name has not been replaced
  if (uri.indexOf("{{") >= 0) {
    // Throws an error indicating that the URI is invalid or the network is not supported
    throw new Error(
      `invalid uri or network not supported by node provider : ${uri}`
    );
  }

  // If none of the previous cases apply, returns the resulting URI
  return uri;
}

export function accounts(networkName?: string): {mnemonic: string} {
  // Calls the getMnemonic function to get the mnemonic associated with the network
  return {mnemonic: getMnemonic(networkName)};
}

function getMnemonic(networkName?: string): string {
  // Checks that the networkName parameter is not empty or null
  if (networkName) {
    // Get an environment variable mnemonic based on the network name
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()];
    // Checks that the mnemonic exists and is not empty
    if (mnemonic && mnemonic !== "") {
      return mnemonic;
    }
  }

  // If the network-specific mnemonic was not found, get the default mnemonic from the environment variable
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "test test test test test test test test test test test junk";
  }
  return mnemonic;
}
