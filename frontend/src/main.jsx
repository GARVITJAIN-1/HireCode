import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MissingKeyScreen from "./components/MissingKeyScreen.jsx";

const queryClient = new QueryClient();

const envKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const localKey = typeof window !== "undefined" ? localStorage.getItem("VITE_CLERK_PUBLISHABLE_KEY") : null;
const publishableKey = envKey || localKey || "";

const root = createRoot(document.getElementById("root"));

if (!publishableKey) {
  root.render(
    <MissingKeyScreen
      onSaveKey={() => {
        window.location.reload();
      }}
    />
  );
} else {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={publishableKey}>
            <App />
          </ClerkProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
