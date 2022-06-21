import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  </Router>
);