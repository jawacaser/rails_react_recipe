import React from "react";
import { Link } from "react-router-dom"

export default (props) => {

    return(
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
        <button type="submit" className="btn custom-button mt-3">
            Save Recipe
        </button>
        <Link to="/recipes" className="btn btn-link mt-3">
            Back to recipes
        </Link>
    </form>
    )
}