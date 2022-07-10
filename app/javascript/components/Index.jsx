import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContextProvider } from "../contexts/ToastContext";
import { UserContextProvider } from "../contexts/UserContext";
import Home from "./Home";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import NewRecipe from "./NewRecipe";
import EditRecipe from "./EditRecipe";
import Contact from "./Contact";
import MyRecipes from "./MyRecipes";
import NotFound from "./NotFound";
import Login from "./Login";
import Navbar from "./Navbar";

export default (
  <Router>
    <ToastContextProvider>
      <UserContextProvider>
      <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/recipes" exact element={<Recipes />} />
          <Route path="/my-recipes" exact element={<MyRecipes />} />
          <Route path="/recipe/:id" exact element={<Recipe />} />
          <Route path="/recipe" exact element={<NewRecipe />} />
          <Route path="/edit/:id" exact element={<EditRecipe />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </ToastContextProvider>
  </Router>
);