import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_de from "./translations/de/common.json";
import common_en from "./translations/en/common.json";
import common_dk from "./translations/dk/common.json";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "dk", // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    de: {
      common: common_de,
    },
    dk: {
      common: common_dk,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <App />
          </StyledEngineProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
