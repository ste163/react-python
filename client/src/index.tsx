import { createRoot } from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

document.body.innerHTML = "<div id='app'></div>";

const appElement = document.getElementById("app");

if (!appElement) throw new Error("No app element found");

const root = createRoot(appElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
