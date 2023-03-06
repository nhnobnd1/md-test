import ReactDOM from "react-dom";
import React from "react";

import App from "./App";

const container = document.createElement("div");

container.setAttribute("id", "widget");
container.innerHTML = `hello world`;
document.body.appendChild(container);
const root = ReactDOM.createRoot(document.getElementById("widget"));
root.render(<App />);
