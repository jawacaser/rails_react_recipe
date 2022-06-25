import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import RecipeCards from './RecipeCards';

export default ({props}) => {
    const [recipes, setRecipes] = useState([])
    const backgroundImg = "https://lh3.googleusercontent.com/keKXXqXLgW_u84YpxLPKXi-EppxXxmwP5OIkuQVwXuAJh491CzTIglLxbTHBcRqzN0XHGYh367TaIVXZE3wIW_ij8acftoPJXQgE6jFHcgYrBcHOZcjqWuM2pOD4kJv4HqNZJTNoLnuVhCTtCmG9GGqNqE2lJny8eexdUwvoy8MFYGLTjFjqn5MCmbp8Ku1kOrz2M5J6A-eLTzbnTNmMifSdIN64Ip_vJIZFc0tU3rfKfVYZUE7OUfwWtRcKYtOg-Oxs-XBZjjJU9E0sVAtK-akAC0IV-vR14m_ddKndzcV_rJg26jG8yu1ffrxBCmBaZRV7CEToYj9bRiDI90gvh5SjL1oM57fjKsA7C5s6WFEtOs-lq7m-EQnL1P6Cc-qr38YSzOTj9qHmlGF4NYDj6z21-71kEAnDWS0N3grGry9toKUY0jtNzRiQi36LhTeAvOkpsYW9F_o3QqzoThVRWgmuZepqQg-XLisGIh5Mkl4OK9oE1P6rslZ5UE6RtLJ4QMRNaq5b-W9Vu39HpEBq4Bq1UuEFKS37ujhteNamRv4NhZqpyWMKtFiy2IlJkP569-aeQnmHMOrStXkaLZegmcsddgAHhucLPGzlyQuGyN2z3gLqcE0DB1L0fRbH7qBR7fIeZdIbWCQwd9gh8ibe_dgpwKaz7exORDvAtbBBn3ALVA4EsUH-1I7rOJ2BKbaLplffik06YPELIfOkIc9yFymp7QRsMLe6YTZFkRI4yb5gsbm6tXOqCUgC-aE5Pu9b7NvVm_OYlQoGDCRHWZ2K4_pBcBf2Lh8ncTqXv_ZlTEhRmPKcVFf8l0L_U5xtS7aMw4hXWsXMLlsQxZRZaWZuyXcQToy1qzbCG9QZKRUh=w1873-h1240-no?authuser=0"
    useEffect(() => {
        const url = "/api/v1/recipes/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                setRecipes(response)})
            .catch(() => Navigate("/"));
    }, []);

    return (
        <div className="primary-color">
            <section className="hero2 position-relative d-flex align-items-center justify-content-center">
                {/* <br/>
                <div className="container py-5 bg-white"> */}
                    <img src={backgroundImg} alt="cutting board image" className="img-fluid position-absolute" />
                    <div className="overlay bg-light position-absolute" />
                    <div className="container position-relative w-75 container container-fluid text-center">
                    <h1 className="display-4">Recipes for feeling good...</h1>
                    <p className="rfs text-muted my-4">
                        Short description about Let's Eat Well, etc etc etc.
                        This app is built with Rails 7 and React. I will be implementing an admin
                        login functionality for my wife to upload recipes and share them safely!
                    </p>
                    </div>
                {/* </div> */}
            </section>
            <div className="py-5 px-4 position-relative">
                <main id="recipe-list" className="Container bg-white py-3 px-5">
                    <div className="text-end mb-3">
                        <Link to="/recipe" className="btn btn-sm btn-outline-secondary">
                            Create New Recipe
                        </Link>
                    </div>
                    <RecipeCards recipes={recipes} />
                    <div className="btn-group d-flex align-items-center">
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                        <button className="btn btn-link" onClick={()=>window.scrollTo({
                            top: 100,
                            left: 100,
                            behavior: 'smooth'
                            })}>
                            Back to Top
                        </button>
                        <Link to="" className="btn btn-link">
                            Contact
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}