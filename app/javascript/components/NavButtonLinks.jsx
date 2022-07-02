import React from 'react';
import { Link } from 'react-router-dom';

export function NavButtonLinks(props) {
    if (props.isAuth) {
        return (<ul className="nav nav-pills mx-3">
            <FeaturedLink />
            <MyRecipesLink />
            <LogoutButton logout={props.logout} />
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
            <Link to="/users/login" className="nav-link text-white">Login</Link>
        </li>)
}
const LogoutButton =(props)=> {
    return(
        <li className="nav-item">
            <button className="nav-link text-white" onClick={props.logout}>Logout</button>
        </li>)
}