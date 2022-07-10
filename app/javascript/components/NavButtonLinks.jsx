import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToastContext from '../hooks/useToastContext';
import UserContext from '../contexts/UserContext';


export function NavButtonLinks(props) {
    if (props.isAuth) {
        return (<ul className="nav nav-pills mx-3">
            <FeaturedLink />
            <MyRecipesLink />
            <LogoutButton />
            </ul>
        )
    } else {
        return (<ul className="nav nav-pills mx-3">
            <FeaturedLink />
            <LoginButton />
        </ul>)
    }
}

const FeaturedLink =()=> {
    return(
        <li className="nav-item">
            <Link to="/recipes" className="nav-link text-white">Featured Recipes</Link>
        </li>)
}
const MyRecipesLink =()=> {
    return(
        <li className="nav-item">
            <Link to="/my-recipes" className="nav-link text-white">My Recipes</Link>
        </li>)
}
const LoginButton =()=> {
    return(
        <li className="nav-item">
            <Link to="/login" className="nav-link text-white">Login</Link>
        </li>)
}
const LogoutButton =(props)=> {
    const { logoutUser } = useContext(UserContext);
    const addToast = useToastContext();
    const navigate = useNavigate();

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
                logoutUser();
                navigate('/')
                addToast("You have signed out successfully.")
            };
        })
        .catch(error => {
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.")
        });
    }

    return(
        <li className="nav-item">
            <button className="nav-link text-white" onClick={logout}>Logout</button>
        </li>)
}