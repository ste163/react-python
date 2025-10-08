import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import App from "./App";
import { ErrorBoundary } from "components/ErrorBoundary";

document.body.innerHTML = "<div id='app'></div>";

const appElement = document.getElementById("app");

if (!appElement) throw new Error("No app element found");

const root = createRoot(appElement);
root.render(
  <StrictMode>
    <ErrorBoundary fallback={<div>An unexpected error occurred.</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
