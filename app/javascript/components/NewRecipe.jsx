import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import useToastContext from '../hooks/useToastContext';


export default ({props}) => {
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instruction, setInstruction] = useState("")
    const [image, setImage] = useState("")
    const [shared, setShared] = useState(false)

    const navigate = useNavigate();
    const addToast = useToastContext();
    const defaultImg = `https://lh3.googleusercontent.com/pw/AM-JKLWzpHEwkBfYDRJwjiLKXVC16AaGjeaCFxN7a1KsiWQqouGKcWR81zvVLEheFYaA35JO3Z9zc-FZlfVmSgYOS38KTz45HwiFhxIDCFiQVeqVrig1lebaATH7CUmgXpMl6ytR1apV0xSHqXd6as5LLcI=w828-h315-no?authuser=0`

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
    useEffect(() => {
        let check = document.getElementById('sharedSwitch')
        check.addEventListener('change', function() {
            setShared(check.checked)
            console.log(check.checked)
        })
    }, [])

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
            image: image.length == 0 ? defaultImg : image,
            shared
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
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            addToast("Recipe Created, Woohoo!")
            navigate(`/recipe/${response.id}`)})
        .catch(error => console.log(error.message));
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="fw-normal mb-3 text-center">
                        Add a new recipe to your collection.
                    </h1>
                    <Form onSubmit={onSubmit} onChange={onChange} />
                </div>
            </div>
        </div>
    );
}