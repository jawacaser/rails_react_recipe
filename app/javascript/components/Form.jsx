import React from "react";
import { Link } from "react-router-dom"

export default (props) => {

    return(
        <div>
            <div className="row">
                <img className="img-fluid text-end" src="https://lh3.googleusercontent.com/pw/AM-JKLWzpHEwkBfYDRJwjiLKXVC16AaGjeaCFxN7a1KsiWQqouGKcWR81zvVLEheFYaA35JO3Z9zc-FZlfVmSgYOS38KTz45HwiFhxIDCFiQVeqVrig1lebaATH7CUmgXpMl6ytR1apV0xSHqXd6as5LLcI=w828-h315-no?authuser=0" />
                <Link to="/recipes" className="btn btn-link mt-3 text-end">
                    Back to recipes
                </Link>
            </div>
        <form onSubmit={props.onSubmit}>
        <div className="form-group">
            <label htmlFor="recipeName">Recipe name</label>
            <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                onChange={props.onChange}
                value={props.name}
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
                onChange={props.onChange}
                value={props.ingredients}
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
            onChange={props.onChange}
            value={props.instruction}
        />
        <div className="form-group">
            <label htmlFor="image">Image Link</label>
            <input
                type="text"
                name="image"
                id="recipeImage"
                className="form-control"
                onChange={props.onChange}
                value={props.image}
            />
            <small id="imageHelp" className="form-text text-muted">
                Optional
            </small>
        </div>
        <div className="text-center">
            <button type="submit" className="btn custom-button mt-3">
            Save Recipe
            </button>
        </div>
    </form>
    </div>
    )
}