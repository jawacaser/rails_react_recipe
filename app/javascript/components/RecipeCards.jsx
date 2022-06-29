import React from 'react';
import { Link } from 'react-router-dom';

const badgeEl = (<p className="badge primary-color rounded-pill text-muted">Shared</p>)

export default ({recipes}) => {
    const allRecipes = recipes.map((recipe, index) => (
        <div key={index} className="col-md-6 col-lg-4">
            <div className="card shadow p-3 mb-5 bg-white rounded primary-color">
                <img src={recipe.image} className="card-img-top" alt={`${recipe.name} image`} />
                <div className="card-body text-center">
                    <h5 className="card-title">{recipe.name} { recipe.shared ? badgeEl : null }</h5>
                    <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
                        View Recipe
                    </Link>
                </div>
            </div>
        </div>
    ))

    const noRecipe = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>No recipes yet. Want to <Link to="/recipe">create one</Link>?</h4>
        </div>
    );

    return (
        <div className="row">
            {recipes.length > 0 ? allRecipes : noRecipe}
        </div>
    )
}