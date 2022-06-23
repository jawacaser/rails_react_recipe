import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default ({props}) => {
    const defaultState = {
        name: "",
        ingredients: "",
        instruction: ""
    };
    const [newRecipe, setNewRecipe] = useState(defaultState)

    function stripHtmlEntities(str) {
        return String(str)
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
    }

    function onChange(event) {
        setNewRecipe({ [event.target.name]: event.target.value });
    }

    function onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/recipes/create";
        const { name, ingredients, instruction } = newRecipe;

        if (name.length == 0 || ingredients.length == 0 || instruction == 0) {
            return
        }

        const body = {
            name,
            ingredients,
            instruction: instruction.replace(/\n/g, "<br> <br>")
        };

        const token = document.querySelector('meta[name="csrf-token"]').textContent;
        fetch(url, {
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
            .then(response => Navigate(`/recipe/${response.id}`))
            .catch(error => console.log(error.message));
    }
}