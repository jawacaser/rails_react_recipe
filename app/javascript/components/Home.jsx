import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-white">
      <div className="container secondary-color p-5">
        <img className="img-fluid" src="https://lh3.googleusercontent.com/pw/AM-JKLWzpHEwkBfYDRJwjiLKXVC16AaGjeaCFxN7a1KsiWQqouGKcWR81zvVLEheFYaA35JO3Z9zc-FZlfVmSgYOS38KTz45HwiFhxIDCFiQVeqVrig1lebaATH7CUmgXpMl6ytR1apV0xSHqXd6as5LLcI=w828-h315-no?authuser=0" />
        {/* <h1 className="display-4">Let's Eat Well</h1> */}
        <p className="lead mt-4">
          A curated list of recipes for healthy, homemade happiness.
        </p>
        <hr className="my-4" />
        <div className="d-flex gap-3">
          <Link to="/recipes" className="btn btn-lg custom-button" role="button">
            View Recipes
          </Link>
          <Link to="/users/sign_in" className="btn btn-lg custom-button" role="button">
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
);