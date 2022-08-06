import React from "react";
import "./styles/index.scss";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./utils/constants";
import { GlobalStyles } from "./styles/GlobalStyles";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider them={theme}>
      <GlobalStyles></GlobalStyles>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
