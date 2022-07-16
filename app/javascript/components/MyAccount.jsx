import React, { useState, useContext } from 'react';
import { UpdateUserForm } from './UpdateUserForm';
import { LiveAlert } from './LiveAlert';
import useToastContext from '../hooks/useToastContext';
import UserContext from '../contexts/UserContext';

export default () => {

    const [alertMsg, setAlertMsg] = useState('Verify your password to update your account information.');
    const [pwCheck, setPwCheck] = useState('')
    const [verified, setVerified] = useState(false)
    const { currentUser } = useContext(UserContext)
    const addToast = useToastContext();

    async function verifyPassword(e) {
        e.preventDefault();
        const url = '/verify'
        const token = document.querySelector('meta[name="csrf-token"]').content;
        let user = {
          "email": currentUser.email,
          "password": pwCheck
        }
        
        await fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user})
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 422) {
                addToast("Couldn't verify account")
                setAlertMsg("Couldn't verify account")
                return
            }
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            if (!response) { return }
            JSON.stringify(response)
            if (response.verified === 'true') {
                setVerified(true)
                addToast("Verified!")
            }
        })
        .catch(error => console.log(error.message));
    }
    
    return (
        <div className="vh-100 primary-color">
        <br/>
        <div className="container bg_secondary-color p-2">
            <h1 className="m-3 text-center text-white display-6">Account Settings</h1>
            <hr className="text-white" />
        </div>
            <div className="container d-flex mt-2 text-center align-items-center justify-content-center">
                { verified ? <UpdateUserForm /> : 
                <div>
                    <h4 className="text-start">Current user information:</h4>
                    <div className="align-items-center mb-3">
                        <ul className="list-group list-group-horizontal mb-1">
                            <li className="list-group-item list-group-item-secondary">Email:</li>
                            <li className="text-muted list-group-item flex-fill">{currentUser.email}</li>
                        </ul>
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item list-group-item-secondary">Username:</li>
                            <li className="text-muted list-group-item flex-fill">{currentUser.username}</li>
                        </ul>
                    </div>
                    <hr/>
                    <br/>
                    <LiveAlert message={alertMsg} dismissable={false} />
                    <form onSubmit={verifyPassword} id="verify" className="mt-3">
                        <div className="mb-3 form-floating form-group">
                            <input
                                required
                                id="verify-password"
                                name="user[password]"
                                type="password"
                                minLength={6}
                                onChange={(e) => setPwCheck(e.target.value)}
                                className="form-control"
                                placeholder="Verify password"
                            />
                            <label className="form-label">Password</label>
                        </div>
                        <button type="submit" className="btn custom-button">Verify</button>
                    </form>
                </div>
                }
            </div>
        </div>
    )
}