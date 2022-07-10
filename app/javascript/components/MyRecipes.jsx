import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCards from './RecipeCards';

export default ({props}) => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const url = "/api/v1/recipes/myindex";
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: 'GET',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            setRecipes(response)})
        .catch(() => navigate("/"));
    }, []);

    return(
        <div className="py-5 px-4 position-relative">
            <main id="recipe-list" className="Container bg-white py-3 px-5">
                <div className="text-end mb-3">
                    <Link to="/recipe" className="btn btn-sm btn-primary">
                        Create New Recipe
                    </Link>
                </div>
                <RecipeCards recipes={recipes} />
                <div className="btn-group d-flex justify-content-between">
                    <Link to="/" className="btn btn-secondary">
                        Home
                    </Link>
                    <button className="btn btn-secondary" onClick={()=>window.scrollTo({
                        top: 100,
                        left: 100,
                        behavior: 'smooth'
                        })}>
                        Back to Top
                    </button>
                    <Link to="/contact" className="btn btn-secondary">
                        Contact
                    </Link>
                </div>
            </main>
        </div>
    )
}