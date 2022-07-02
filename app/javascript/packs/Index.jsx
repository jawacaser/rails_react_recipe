import React from "react";
import { createRoot } from "react-dom/client";
import $ from 'jquery';
import App from "../components/App";
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/alert';
import 'bootstrap/js/src/toast';

$(document).on("turbo:load", () => {
  const container = document.body.appendChild(document.createElement("div"));
  const root = createRoot(container)
  // Temporarily fixes odd re-rendering of root after visiting login page
  // remove conditionally 'if' once wiring frontend components to devise is completed
  if (!document.getElementById('root')){
    root.render(<App />)
  }

});