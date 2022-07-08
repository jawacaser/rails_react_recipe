import React, { createContext, useCallback, useState } from "react";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
    const defaultUser = {
        id: 0,
        role: '',
        username: ''
    }

    const [currentUser, setCurrentUser] = useState(defaultUser);

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