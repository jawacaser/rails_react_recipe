import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToastContext from "../hooks/useToastContext"

export default (props) => {

    const [numLikes, setNumLikes] = useState(0)
    const [liked, setLiked] = useState(false)
    const { id } = useParams();
    const addToast = useToastContext();
    
    function getCount() {
        const url = `/likes/${id}`
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "GET",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            addToast("Uh oh, something went wrong... try refreshing")
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            setNumLikes(parseInt(JSON.stringify(response.count)))
            setLiked(JSON.stringify(response.liked) == "true" ? true : false)
        })
        .catch(error => console.log(error.message));
    }

    useEffect(()=> {    
        getCount();
    }, [])

    async function handleLike(event) {       
        event.preventDefault();
        const url = '/likes'
        const body = {
            recipe_id: id
        }
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
                setNumLikes(numLikes + 1)
                setLiked(true)
                return
            }
            addToast("Uh oh, something went wrong... try refreshing")
            throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }

    async function handleUnlike(event) {
        event.preventDefault();
        const url = `/likes/${id}`
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
                setNumLikes(numLikes - 1)
                setLiked(false)
                return
            }
            addToast("Uh oh, something went wrong... try refreshing")
            throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }

    const LikeBtn = () => (
        <button name="like" className="btn btn-primary" onClick={handleLike}>Like {String.fromCodePoint(0x1F951)}</button>
    )

    const UnlikeBtn = () => (
        <button name="unlike" className="btn btn-dark btn-sm" onClick={handleUnlike}>Unlike</button>
    )

    return (
        <div>
            { liked ? <UnlikeBtn /> : <LikeBtn /> }
            <p className="fw-bolder mt-2">{numLikes} Like{numLikes == 1 ? null : 's'} { liked ? String.fromCodePoint(0x1F951) : null }</p>
        </div>
    )
}