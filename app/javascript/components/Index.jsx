import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Recipes from "./Recipes";
import Recipe from "./Recipe";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/recipes" exact element={<Recipes />} />
      <Route path="/recipe/:id" exact element={<Recipe />} />
    </Routes>
  </Router>
);