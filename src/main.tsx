import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./api/store.ts";
import LoadingOverlay from "./components/LoadingOverlay.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingOverlay />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
);
