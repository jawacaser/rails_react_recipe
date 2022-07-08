import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import RecipeCards from './RecipeCards';
import UserContext from '../contexts/UserContext';



export default ({props}) => {
    const [recipes, setRecipes] = useState([])
    const backgroundImg = "https://lh3.googleusercontent.com/pw/AM-JKLXF6NK9eM4qZ_cdMQnUY3KxMDvdiPYj9hslTMJdOmZDp47A2wwdz3aZVKkavtuvIydVSY_w8fQNOA0Z2pGoqFTqEoy78x7fjjHXOUY1Q3RQMYdCr7-BlyaaHoBsJiaLwQC8SsfzEhCi_jVmBjWRqu4=w1873-h1240-no?authuser=0"

    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        const url = "/api/v1/recipes/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                addToast("Uh oh, something went wrong...")
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                setRecipes(response)})
            .catch(() => Navigate("/"));
    }, []);

    return (
        <div className="primary-color">
            <section className="hero2 position-relative d-flex align-items-center justify-content-center">
                <img src={backgroundImg} alt="cutting board image" className="img-fluid position-absolute" />
                <div className="overlay bg-light position-absolute" />
                <div className="container position-relative w-75 container container-fluid text-center">
                    <h1 className="display-4">Recipes for feeling good...</h1>
                    <p className="rfs text-muted my-4">
                        Short description about Let's Eat Well, etc etc etc.
                        This app is built with Rails 7 and React. I have implemented
                        login functionality using Devise. Work in progress!
                        TODO: Wire up Registration, change some hardcoded backend,
                        "share to social media" buttons?, prettier contact page,
                        create a shared index page (a la pinterest)
                        
                        id: {currentUser.id}, role: {currentUser.role}, username: {currentUser.username}
                    </p>
                </div>
            </section>
            <div className="py-5 px-4 position-relative">
                <main id="recipe-list" className="Container bg-white py-3 px-5">
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
        </div>
    );
}