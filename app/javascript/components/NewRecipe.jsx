import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default ({props}) => {
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instruction, setInstruction] = useState("")
    const navigate = useNavigate();

    function stripHtmlEntities(str) {
        return String(str)
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
    }

    function onChange(event) {
        if (event.target.name == "name") {
            setName(event.target.value)
        } else if (event.target.name == "ingredients") {
            setIngredients(event.target.value)
        } else if (event.target.name == "instruction") {
            setInstruction(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/recipes/create";

        if (name.length == 0 || ingredients.length == 0 || instruction == 0) {
            return
        }

        const body = {
            name,
            ingredients,
            instruction: instruction.replace(/\n/g, "<br> <br>")
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        await fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => navigate(`/recipe/${response.id}`))
            .catch(error => console.log(error.message));
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        Add a new recipe to your awesome recipe collection.
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="recipeName">Recipe name</label>
                            <input
                                type="text"
                                name="name"
                                id="recipeName"
                                className="form-control"
                                required
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipeIngredients">Ingredients</label>
                            <input
                                type="text"
                                name="ingredients"
                                id="recipeIngredients"
                                className="form-control"
                                required
                                onChange={onChange}
                            />
                            <small id="ingredientsHelp" className="form-text text-muted">
                                Separate each ingredient with a comma.
                            </small>
                        </div>
                        <label htmlFor="instruction">Preparation Instructions</label>
                        <textarea
                            className="form-control"
                            id="instruction"
                            name="instruction"
                            rows="5"
                            required
                            onChange={onChange}
                        />
                        <button type="submit" className="btn custom-button mt-3">
                            Create Recipe
                        </button>
                        <Link to="/recipes" className="btn btn-link mt-3">
                            Back to recipes
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}