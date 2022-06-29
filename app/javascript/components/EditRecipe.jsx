import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './Form';

export default ({props}) => {
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instruction, setInstruction] = useState("")
    const [image, setImage] = useState("")
    const [shared, setShared] = useState(false)

    const { id } = useParams();
    const navigate = useNavigate();
    const defaultImg = `https://lh3.googleusercontent.com/pw/AM-JKLWzpHEwkBfYDRJwjiLKXVC16AaGjeaCFxN7a1KsiWQqouGKcWR81zvVLEheFYaA35JO3Z9zc-FZlfVmSgYOS38KTz45HwiFhxIDCFiQVeqVrig1lebaATH7CUmgXpMl6ytR1apV0xSHqXd6as5LLcI=w828-h315-no?authuser=0`

    function stripHtmlEntities(str) {
        return String(str)
          .replace(/<br> <br>/g, "\n")
    }

    useEffect(() => {
        const url = `/api/v1/edit/${id}`

        fetch(url)
            .then(response => {
                 if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                if (Object.keys(response).length === 0) {
                    console.log('Bad request')
                    navigate(-1)
                }
                setName(response.name)
                setIngredients(response.ingredients)
                setInstruction(stripHtmlEntities(response.instruction))
                setImage(response.image != defaultImg ? response.image : "")
                setShared(response.shared)
            })
            .catch(() => navigate(`/recipe/${id}`));
    }, [])

    function onChange(event) {
        let e = event.target.name
        let value = event.target.value
        if (e == "name") {
            setName(value)
        } else if (e == "ingredients") {
            setIngredients(value)
        } else if (e == "instruction") {
            setInstruction(value)
        } else if (e == "image") {
            setImage(value)
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
        const url = `/api/v1/update/${id}`;

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
            method: "PUT",
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

    function confirmBeforeDelete() {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            deleteRecipe()
        }
    }

    async function deleteRecipe() {
        const url = `/api/v1/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        await fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(() => navigate("/my-recipes"))
        .catch(error => console.log(error.message));
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-3">
                        Need to make some changes?
                    </h1>
                    <Form 
                        onSubmit={onSubmit} 
                        onChange={onChange}
                        name={name}
                        ingredients={ingredients}
                        instruction={instruction}
                        image={image}
                        shared={shared}
                    />
                    <div className="text-center">
                    <button type="button" className="btn btn-danger my-2 btn-sm" onClick={confirmBeforeDelete}>
                            Delete Recipe
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}