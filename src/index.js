import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Application from "./application";
import registerServiceWorker from "./registerServiceWorker";

const container = document.getElementById("root");
const reactDOMRoot = createRoot(container);
reactDOMRoot.render(<Application />);

registerServiceWorker();
