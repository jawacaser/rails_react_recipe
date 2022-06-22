import { Link } from 'react-router-dom';

export const RecipeCards = (recipes) => {
    const allRecipes = recipes.map((recipe, index) => (
        <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
                <img src={recipe.image} className="card-img-top" alt={`${recipe.name} image`} />
                <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
                        View Recipe
                    </Link>
                </div>
            </div>
        </div>
    ))

    const noRecipe = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>No recipes yet. Want to <Link to="/new_recipe">create one</Link>?</h4>
        </div>
    );

    function display() {
        return recipes.length > 0 ? allRecipes : noRecipe
    }

    return (
        {display}
    )
}