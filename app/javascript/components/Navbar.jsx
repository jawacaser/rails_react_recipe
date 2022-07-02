import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavButtonLinks, LoginButton, LogoutButton, MyRecipesLink, FeaturedLink } from './NavButtonLinks';

export default (props) => {
    let user;
    if (sessionStorage.getItem('username') != undefined) {
        user = JSON.parse(sessionStorage.getItem('username'))
    } else {
        user = ''
    }

    const [isAuth, setIsAuth] = useState(user ? true : false)
    const [username, setUsername] = useState(user)
    const navigate = useNavigate();

    useEffect(()=> {
        setIsAuth(user ? true : false)
        setUsername(user ? user : '')
    }, [user, logout])

    function Greeting(props) {
        return (<span className="text-white">Welcome, {props.username}!</span>)
    }

    async function logout(event) {
        event.preventDefault();  
        let remove = sessionStorage.getItem('username')
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
            if (response.ok) {
                sessionStorage.removeItem('username', remove)
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => navigate(`/`))
        .catch(error => console.log(error.message));
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light mb-5 fixed-top" style={{'backgroundColor': '#293241'}}>
                <div className="container-fluid">
                    <a href="/" className="navbar-brand text-white">Let's Eat Well</a>
    {/* <%= link_to "Let's Eat Well", root_path, class: "navbar-brand text-white" %> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>     
                    </button>
                    { isAuth ? <Greeting username={username} /> : null }
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <NavButtonLinks isAuth={isAuth} logout={logout} />
                    
                    {/* <% flash.each do |key, value| %> 
                    <li class="nav-item">
                    <p class="text-white text-muted navbar-text"><%= value %></p>
                    </li>
                    <% end %> */}
        
                    </div>
                </div>
            </nav>
        </div>
    )
}