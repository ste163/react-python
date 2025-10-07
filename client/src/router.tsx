import { createBrowserRouter } from "react-router";
import App from "./App";
import type { Task } from "./types";

// for now, there is only one route, for the main app,
// but in a larger app this would be split out across many paths and components
// that can be nested with their own data loaders
export const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const res = await fetch("http://localhost:8000/tasks/");
      return (await res.json()) as Task[];
    },
    Component: App,
  },
]);
