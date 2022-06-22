import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import RecipeCards from './RecipeCards';

export default ({props}) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const url = "/api/v1/recipes/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log(response)
                setRecipes(response)})
            .catch(() => Navigate("/"));
    }, []);

    return (
        <div>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Recipes for feeling good...</h1>
                    <p className="lead text-muted">
                        Short description about Let's Eat Well, etc etc etc.
                    </p>
                </div>
            </section>
            <div className="py-5 px-4">
                <main className="Container">
                    <div className="text-end mb-3">
                        <Link to="/recipe" className="btn custom-button">
                            Create New Recipe
                        </Link>
                    </div>
                    <RecipeCards recipes={recipes} />
                    <Link to="/" className="btn btn-link">
                        Home
                    </Link>
                </main>
            </div>
        </div>
    );
}