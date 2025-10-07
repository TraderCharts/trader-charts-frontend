import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Application from "./application";


const container = document.getElementById("root");
const reactDOMRoot = createRoot(container);
reactDOMRoot.render(<Application/>);

registerServiceWorker();
