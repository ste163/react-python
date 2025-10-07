import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import App from "./App";

document.body.innerHTML = "<div id='app'></div>";

const appElement = document.getElementById("app");

if (!appElement) throw new Error("No app element found");

const root = createRoot(appElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
