import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";

// Render the application to the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the app in BrowserRouter to enable routing */}
    <BrowserRouter>
      {/* Provide the PlayerContext to the entire app */}
      <PlayerContextProvider>
        {/* Render the main App component */}
        <App />
      </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
