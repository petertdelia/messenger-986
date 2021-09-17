import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 14
    },
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    passwordFontSize: 20,
    converseBackground: 24,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    },
    fontWeight: "bold"
  },
  spacing: factor => factor,
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    color: "white",
  }
});
