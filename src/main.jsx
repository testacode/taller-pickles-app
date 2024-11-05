import { ColorModeProvider } from "./components/ui/color-mode";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { StrictMode } from "react";
import App from "./apps.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </Provider>
  </StrictMode>
);
