import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import "./styles/index.css";

import makeServer from "./mockapiserver/server";
import { OrgProvider } from "./context/OrgContext";

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrgProvider>
      <App />
    </OrgProvider>
  </React.StrictMode>
);
