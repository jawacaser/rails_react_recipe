import React, { useContext, useEffect, useState } from 'react';
import { NavButtonLinks } from './NavButtonLinks';
import UserContext from '../contexts/UserContext';

export default (props) => {
    const { currentUser, logoutUser } = useContext(UserContext)
    let user = currentUser.username;
    const [isAuth, setIsAuth] = useState(user ? true : false)

    useEffect(()=> {
        setIsAuth(user ? true : false)
        }, [currentUser, logoutUser]
    )

    function Greeting(props) {
        return (<span className="text-white">Welcome, {user}!</span>)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light mb-5 fixed-top" style={{'backgroundColor': '#293241'}}>
                <div className="container">
                    <a href="/" className="navbar-brand text-white">Let's Eat Well</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>   
                    </button>
                    { isAuth ? <Greeting user={currentUser.username} /> : null }
                    <div className="collapse navbar-collapse justify-content-end" id="nav-collapse">
                        <NavButtonLinks isAuth={isAuth} />
                    </div>
                </div>
            </nav>
        </div>
    )
}