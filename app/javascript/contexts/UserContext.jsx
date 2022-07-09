import React, { createContext, useCallback, useEffect, useState } from "react";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
    const defaultUser = {
        id: 0,
        role: '',
        username: ''
    }
    const [currentUser, setCurrentUser] = useState(defaultUser);

    const token = document.querySelector('meta[name="csrf-token"]').content;

    function refreshUser() {
        fetch('/user', {
            method: 'GET',
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
        .then(response=> {
        if (!response) { return }
        JSON.stringify(response);
        setCurrentUser({ id: response.id, role: response.role, username: response.username })
        })
        .catch(error => console.log(error.message))
    }

    useEffect(()=> {
        // On the event of a user login or logout, trigger the effect
        // Necessary for browser refresh, or page closed then re-opened
        refreshUser();
    }, [setCurrentUser])

    useEffect(()=> {
        // Not ideal, but if the user's session has expired over a long period of time
        // and the front still shows credentials, the next click/request will send the
        // user back to the home page (unauthenticated action)-- 
        // thus triggering the effect, updating the front-end state
        if (window.location.pathname === '/') {
            console.log('home triggered')
            refreshUser();
        }
    }, [window.location.pathname])

    const loginUser = useCallback(
        function(data)  {
            setCurrentUser(data)
        },
        [setCurrentUser]
    );

    const logoutUser = useCallback(
        function() {
            setCurrentUser(defaultUser);
        },
        [setCurrentUser]
    );

    return (
        <UserContext.Provider value={{ currentUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}