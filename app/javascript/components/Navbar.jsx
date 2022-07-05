import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavButtonLinks } from './NavButtonLinks';
import useToastContext from '../hooks/useToastContext';

export default (props) => {
    let user;
    const [isAuth, setIsAuth] = useState(user ? true : false)
    const [username, setUsername] = useState(user)
    const navigate = useNavigate();
    const addToast = useToastContext();

    useEffect(()=> {
        if (sessionStorage.getItem('username') != undefined) {
            user = JSON.parse(sessionStorage.getItem('username'))
        } else {
            user = ''
        }
        setIsAuth(user ? true : false)
        setUsername(user ? user : '')
    }, [user, logout])

    function Greeting(props) {
        return (<span className="text-white">Welcome, {props.username}!</span>)
    }

    async function logout(event) {
        event.preventDefault();  
        const url = '/users/logout'
        const token = document.querySelector('meta[name="csrf-token"]').content;
        await fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 204) {
                sessionStorage.clear()
                navigate('/')
                addToast("You have signed out successfully.")
            };
        })
        .catch(error => {
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.")
        });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light mb-5 fixed-top" style={{'backgroundColor': '#293241'}}>
                <div className="container-fluid">
                    <a href="/" className="navbar-brand text-white">Let's Eat Well</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>   
                    </button>
                    { isAuth ? <Greeting username={username} /> : null }
                    <div className="collapse navbar-collapse justify-content-end" id="nav-collapse">
                        <NavButtonLinks isAuth={isAuth} logout={logout} />
                    </div>
                </div>
            </nav>
        </div>
    )
}