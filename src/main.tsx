import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
// src/main.tsx

// 1. Sekat Right-Click (Context Menu)
document.addEventListener("contextmenu", (e: MouseEvent) => {
  e.preventDefault();
});

// 2. Sekat Kekunci F12, Ctrl+Shift+I, Ctrl+Shift+J, dan Ctrl+U (Inspect Element Shortcuts)
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C")) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
