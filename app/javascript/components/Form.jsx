import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default (props) => {
    const [checked, setChecked] = useState(props.shared)
    const navigate = useNavigate();

    useEffect(()=> {
        setChecked(props.shared)
    },[props.shared])

    return(
        <div>
            <div className="row">
                <img className="img-fluid text-end" src="https://lh3.googleusercontent.com/pw/AM-JKLWzpHEwkBfYDRJwjiLKXVC16AaGjeaCFxN7a1KsiWQqouGKcWR81zvVLEheFYaA35JO3Z9zc-FZlfVmSgYOS38KTz45HwiFhxIDCFiQVeqVrig1lebaATH7CUmgXpMl6ytR1apV0xSHqXd6as5LLcI=w828-h315-no?authuser=0" />
                <div className="text-end mt-2 mr-4">
                    <button type="button" onClick={()=>navigate(-1)} className="btn btn-secondary w-25">
                            Back
                    </button>
                </div>
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
                Optional (leave blank for default image)
            </small>
        </div>
        <div className="form-check form-switch">
            <input className="form-check-input"
                type="checkbox"
                name="shared"
                checked={checked}
                onChange={()=> {checked ? setChecked(false) : setChecked(true)}} 
                role="switch" 
                id="sharedSwitch" />
            <label className="form-check-label" htmlFor="sharedSwitch">{checked ? 'Sharable!' : 'Currently Private'}</label>
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