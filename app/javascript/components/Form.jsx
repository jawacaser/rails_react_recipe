import React from "react";
import { Link } from "react-router-dom"

export default (props) => {

    return(
        <div>
            <div className="row">
                <img className="img-fluid text-end" src="https://lh3.googleusercontent.com/fdWgfsZfBdhwtlgp7iEwji-vXKoQmHfaToXnqb05efGB6fSsQNHr2B2iYBO1pxbHQxulOin2Wmsc9V5qiOVbOOG4ToTmidFrHByXPExv4Dp69UWAGPM1-K_SiX1GAtZC1h_rsFTN__CHXlzPSf4VkITzz_lKfVXFUEUqLMimWVata68zUok6jl5az0gT3wCSAF6j5OGs9l34yi0NE7vCpV3frEtbqSGs6-Yd53I4nM2Dps928VqAm6pN7QaiX5_b6azsJme1ZMyOW6S9zOdKEC1i0dnn2ZKSurPhj3Mlo8RvLTAlAG_-28lMwuUC7042fpU-DD5339Ni9Mh3g5VsmI1xyeLDGP8xSUeDAh_84mBeQgF7bbM4vrlIzmG4QNsi3i2mjt_nFapsi2oOLjM8n7AKq9Y4SydhcHZzJNwgjqbF55c8-zoY1xSubGoEZRDd9b9rQOEmAha_oThauc170aR92IlOFeoulyBvpOo-eJ9vlhhz8cK9C23A-ALfL-i4FCT5ByjRULCH5YRS0es-ibsjpe3VQy2O-qDDxaXtrD2kE1S6q4vFj-L3Vk0GIAMG2CdFzcnWt04pBYVVDaECUzlIANa4f8GIL1lW_8iO7Na0jAXUgsmGjtQzjv6U2xL57f7yoBRM4mN0O-KCZjBy5ASWi5zoOc6ejxb40mqyK0kY2-c0J6z2VQARGgwusoCIIp7KgaQinDLW03NSvtZhsuoZJ_R28DzYOLKiZ871MqmDSmJTBsreNfea0Vw8FK6Xrxo-puiGAujcAbXGNDNjuAfjuO70XZTCYW-zc5WiQBlEwikHwEzeX5M37xWf8wTw4Ah0YntJLBe9iiFb7Mmzhef7yLbMkTgGPdyv1v5-=w828-h315-no?authuser=0" />
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