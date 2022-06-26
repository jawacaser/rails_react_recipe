import React from "react";
import { createRoot } from "react-dom/client";
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap'
import App from "../components/App";

$(document).on("turbo:load", () => {
  const container = document.body.appendChild(document.createElement("div"));
  const root = createRoot(container)
  root.render(<App />)
});