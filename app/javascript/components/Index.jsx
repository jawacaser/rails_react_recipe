import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import NewRecipe from "./NewRecipe";
import EditRecipe from "./EditRecipe";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/recipes" exact element={<Recipes />} />
      <Route path="/recipe/:id" exact element={<Recipe />} />
      <Route path="/recipe" exact element={<NewRecipe />} />
      <Route path="/edit/:id" exact element={<EditRecipe />} />
    </Routes>
  </Router>
);