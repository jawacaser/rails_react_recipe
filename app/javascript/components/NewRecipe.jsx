import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';


export default ({props}) => {
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instruction, setInstruction] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate();
    const defaultImg = `https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg`

    function onChange(event) {
        if (event.target.name == "name") {
            setName(event.target.value)
        } else if (event.target.name == "ingredients") {
            setIngredients(event.target.value)
        } else if (event.target.name == "instruction") {
            setInstruction(event.target.value)
        } else if (event.target.name == "image") {
            setImage(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/recipes/create";

        if (name.length == 0 || ingredients.length == 0 || instruction == 0) {
            return
        }

        const body = {
            name,
            ingredients,
            instruction: instruction.replace(/\n/g, "<br> <br>"),
            image: image.length == 0 ? defaultImg : image
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        await fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => navigate(`/recipe/${response.id}`))
        .catch(error => console.log(error.message));
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        Add a new recipe to your awesome recipe collection.
                    </h1>
                    <Form onSubmit={onSubmit} onChange={onChange} />
                </div>
            </div>
        </div>
    );
}