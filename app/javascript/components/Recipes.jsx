import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { RecipeCards } from './RecipeCards';

export const Recipes = (props) => {
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
            .then(response => setRecipes(response))
            .catch(() => props.history.push("/"));
    }, [recipes]);

    return (
        <>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Recipes for feeling good...</h1>
                    <p className="lead text-muted">
                        Short description about Let's Eat Well, etc etc etc.
                    </p>
                </div>
            </section>
            <div className="py-5">
                <main className="Container">
                    <div className="text-right mb-3">
                        <Link to="/recipe" className="btn custom-button">
                            Create New Recipe
                        </Link>
                    </div>
                    <div className="row">
                        <RecipeCards recipes={recipes} />
                    </div>
                    <Link to="/" className="btn btn-link">
                        Home
                    </Link>
                </main>
            </div>
        </>
    );
}