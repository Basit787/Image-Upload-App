import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QueryProvider from "./query-provider.tsx";
import ContextProviders from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ContextProviders>
        <App />
      </ContextProviders>
    </QueryProvider>
  </StrictMode>
);
