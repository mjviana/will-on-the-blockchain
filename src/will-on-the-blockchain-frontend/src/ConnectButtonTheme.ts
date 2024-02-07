import merge from "lodash.merge";
import {darkTheme, Theme} from "@rainbow-me/rainbowkit";

const walletTheme = merge(darkTheme(), {
  colors: {
    accentColorForeground: "white",
    accentColor: "#b09736",
    actionButtonBorder: "#b09736",
    actionButtonBorderMobile: "#b09736",
    actionButtonSecondaryBackground: "#b09736",
    closeButton: "#b09736",
  },
  radii: {
    actionButton: "5px",
    connectButton: "5px",
  },
} as Theme);

export default walletTheme;
