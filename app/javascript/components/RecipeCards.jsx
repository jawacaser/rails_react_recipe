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
            <h4 className="mb-4">No recipes yet. Want to <Link to="/recipe">make one</Link>?</h4>
            <img className="img-fluid" style={{maxWidth: "720px"}} src="https://lh3.googleusercontent.com/pw/AM-JKLXTGKp7FnGPm-6AWGsT810oJhgZJt9JgEmyJ7APd5zJRd15ahLbwPcISshwH3e21OeRmvbH_VR3m3PNSrDjTzU0TC5Zbpfte_cYyxHD3O_7Qat9Y8moWhpfDCqCVBec9Jzu9g6knnpDlRdPXXyl-8Pt=w1292-h862-no?authuser=0" />
        </div>
    );

    return (
        <div className="row">
            {recipes.length > 0 ? allRecipes : noRecipe}
        </div>
    )
}