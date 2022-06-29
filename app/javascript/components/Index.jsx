import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import NewRecipe from "./NewRecipe";
import EditRecipe from "./EditRecipe";
import Contact from "./Contact";
import MyRecipes from "./MyRecipes";
import NotFound from "./NotFound";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/recipes" exact element={<Recipes />} />
      <Route path="/my-recipes" exact element={<MyRecipes />} />
      <Route path="/recipe/:id" exact element={<Recipe />} />
      <Route path="/recipe" exact element={<NewRecipe />} />
      <Route path="/edit/:id" exact element={<EditRecipe />} />
      <Route path="/contact" exact element={<Contact />} />
      <Route exact element={<NotFound />} />
    </Routes>
  </Router>
);