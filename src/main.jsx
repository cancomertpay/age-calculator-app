import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AgeContextProvider from "./store/AgeContext.jsx";
import ErrorStatesContextProvider from "./store/ErrorStatesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AgeContextProvider>
      <ErrorStatesContextProvider>
        <App />
      </ErrorStatesContextProvider>
  </AgeContextProvider>
);
