import * as React from "react";
import * as ReactDOM from "react-dom";
import "./registerService";
import "./main.css";
import "./document.css"
import { App } from "./components/main";

ReactDOM.hydrate(
  // <React.StrictMode>
  <App />,
  document.getElementById("root")!,
  // </React.StrictMode>,
);
