import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import RecipeCards from './RecipeCards';

export default ({props}) => {
    const defaultState = { ingredients: "" }
    const [oneRecipe, setOneRecipe] = useState(defaultState)
    const { id } = useParams();

    useEffect(() => {
        const url = `/api/v1/show/${id}`

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setOneRecipe(response))
            .catch(() => Navigate("/recipes"));
    }, [])

    function addHtmlEntities(str) {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    let ingredientList = "No ingredients listed";
    
    if (oneRecipe.ingredients.length > 0) {
        ingredientList = oneRecipe.ingredients
            .split(",")
            .map((ingredient, index) => (
                <li key={index} className="list-group-item">
                    {ingredient}
                </li>
            ));
    }

    const recipeInstruction = addHtmlEntities(oneRecipe.instruction)
    
    return (
        <div className="">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
                <img src={oneRecipe.image} alt={`${oneRecipe.name} image`} className="img-fluid position-absolute" />
                <div className="overlay bg-dark position-absolute" />
                <h1 className="display-4 position-relative text-white">
                    {oneRecipe.name}
                </h1>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <h5 className="mb-2">Ingredients</h5>
                            {ingredientList}
                        </ul>
                    </div>
                    <div className="col-sm-12 col-lg-7">
                        <h5 className="mb-2">Preparation Instructions</h5>
                        <div dangerouslySetInnerHTML={{
                        __html: `${recipeInstruction}`
                        }}
                        />
                    </div>
                    <div className="col-sm-12 col-lg-2">
                        <button type="button" className="btn btn-danger">
                            Delete Recipe
                        </button>
                    </div>
                </div>
                <Link to="/recipes" className="btn btn-link">
                    Back to recipes
                </Link>
            </div>
        </div>
    );
}