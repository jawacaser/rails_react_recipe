import React, { useState } from 'react';
import useToastContext from '../hooks/useToastContext';
import { Modal } from 'bootstrap';


export default (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const addToast = useToastContext();

    const LiveAlert = (props) => {
        return (
            <div className="alert alert-info alert-dismissible" role="alert">
                {props.message}
            </div>
        )
    }

    function success() {
        setAlertMsg("You signed up successfully! You may close this window and log in now.")
        document.getElementById('signup-submit').disabled = true;
    }

    function reset() {
        const myModalEl = document.getElementById('signup-modal')
        const modal = Modal.getInstance(myModalEl)
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPw('');
        setAlertMsg('');
        document.getElementById('signup-submit').disabled = false;
        document.getElementById('signup-form').reset();
        modal.hide();
    }

    async function handleSignUp(e) {
        e.preventDefault();
        const url = '/users/register'
        const token = document.querySelector('meta[name="csrf-token"]').content;

        let user = {
        email,
        username,
        password,
        "password_confirmation": confirmPw
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
                setAlertMsg("There was a problem signing up...")
            }
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            if (!response) { return }
            JSON.stringify(response);
            success();
        })
        .catch(error => console.log(error.message));
    }

    return(
    <div className="modal fade" id="signup-modal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modal-title">Sign up</h5>
                    <button type="button" className="btn-close" onClick={reset} aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                    <h6>You will be able to create, share, and like recipes after signing up!</h6>                   
                    <form onSubmit={handleSignUp} id="signup-form">
                        <div className="mb-3 form-floating form-group">              
                        <input
                            required
                            id="signup-email"
                            name="signup-email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter email"
                        />
                        <label className="form-label">Email address</label>
                        </div>
                        <div className="mb-3 form-floating form-group">              
                        <input
                            required
                            id="signup-username"
                            name="signup-username"
                            type="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Enter username"
                        />
                        <label className="form-label">Username</label>
                        </div>
                        <div className="mb-3 form-floating form-group">             
                        <input
                            required
                            id="signup-password"
                            name="signup-password"
                            type="password"
                            minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter password"                
                        />
                        <label className="form-label">Password</label>
                        </div>
                        <div className="mb-3 form-floating form-group">             
                        <input
                            required
                            id="password-confirmation"
                            name="password-confirmation"
                            type="password"
                            onChange={(e) => setConfirmPw(e.target.value)}
                            className="form-control"
                            placeholder="Confirm password"
                        />
                        <label className="form-label">Confirm Password</label>
                        </div>
                        { password == '' ? null :
                            <div>{password == confirmPw ? 
                            <p className="text-success">Passwords Match!</p> : <p className="text-danger">Passwords must match...</p>}
                            </div> }
                            { alertMsg ? <LiveAlert message={alertMsg} /> : null }
                        <div className="modal-footer">
                            <button type="submit" id="signup-submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={reset}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}