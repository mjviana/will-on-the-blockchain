import merge from "lodash.merge";
import {darkTheme, lightTheme, Theme} from "@rainbow-me/rainbowkit";

export const walletTheme = merge(darkTheme(), {
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

export const walletLightTheme = merge(lightTheme(), {
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


export const walletDarkTheme = merge(darkTheme(), {
  colors: {
    accentColorForeground: "black",
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


