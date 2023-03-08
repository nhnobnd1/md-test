import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const container = document.createElement("div");

container.setAttribute("id", "widgetId");

document.body.appendChild(container);
const root = ReactDOM.createRoot(document.getElementById("widgetId"));
root.render(<App />);
