import React, { useState, useContext } from 'react';
import { LiveAlert } from './LiveAlert';
import useToastContext from '../hooks/useToastContext';
import UserContext from '../contexts/UserContext';

export const UpdateUserForm =(props)=> { 
    const [alert, setAlert] = useState({message: '', flavor: ''});
    const [field, setField] = useState('')
    const addToast = useToastContext();
    const { loginUser } = useContext(UserContext)

    function buildUserInfo() {
        if (field === 'email') {
            let value = document.getElementById('new-email').value
            return { "email": value }
        } else if (field === 'username') {
            let value = document.getElementById('new-username').value
            return { "username": value }
        } else if (field === 'password') {
            let value = document.getElementById('new-password').value
            let valueConfirm = document.getElementById('new-password-confirmation').value
            return { "password": value, "password_confirmation": valueConfirm }
        }
    }

    function capFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function submitUpdate(e) {
        e.preventDefault();
        const url = '/users/register'
        const token = document.querySelector('meta[name="csrf-token"]').content;
        let user = buildUserInfo()
        await fetch(url, {
            method: 'PUT',
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
                setAlert({ message:`There was a problem updating your ${field}.`, flavor: "warning" })
            }
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            if (!response) { return }
            JSON.stringify(response);
            loginUser({ id: response.id, role: response.role, username: response.username, email: response.email  })
            setAlert({ message:`${capFirstLetter(field)} updated successfully!`, flavor: "success" })
        })
        .catch(error => console.log(error.message));
    }

    function handleSelection(selection) {
        if (!selection) { 
            return (<h6 className="fst-italic text-white">Select a field to update...</h6>)
        } else if (selection === "email") {
            return <EmailField />
        } else if (selection === "username") {
            return <UsernameField />
        } else if (selection === "password") {
            return <PasswordField />
        }
    }

    const UpdateOptions =()=> {
        return (
            <div className="d-flex justify-content-evenly">
                <button className="btn bg_secondary-color text-white" onClick={()=>{setField('email')}}>Email</button>
                <button className="btn bg_secondary-color text-white" onClick={()=>{setField('username')}}>Username</button>
                <button className="btn bg_secondary-color text-white" onClick={()=>{setField('password')}}>Password</button>
            </div>
        )
    }

    const EmailField =()=> {
        const [email, setEmail] = useState('');
        return (
            <div className="mb-3 form-floating form-group">              
                <input
                    id="new-email"
                    name="user[email]"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                />
                <label className="form-label">New Email</label>
            </div>
        )
    }

    const UsernameField =()=> {
        const [username, setUsername] = useState('');
        return (
            <div className="mb-3 form-floating form-group">              
                <input
                    id="new-username"
                    name="user[username]"
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                />
                <label className="form-label">New Username</label>
            </div>
        )
    }

    const PasswordField =()=> {
        const [password, setPassword] = useState('');
        const [confirmPw, setConfirmPw] = useState('');
        return (
            <div>
                <div className="mb-3 form-floating form-group">             
                    <input
                        required
                        id="new-password"
                        name="user[password]"
                        type="password"
                        minLength={6}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"             
                    />
                    <label className="form-label">New Password</label>
                </div>
                <div className="mb-3 form-floating form-group">             
                    <input
                        required
                        id="new-password-confirmation"
                        name="password-confirmation"
                        type="password"
                        onChange={(e) => setConfirmPw(e.target.value)}
                        className="form-control"
                    />
                    <label className="form-label">Confirm Password</label>
                </div>
                    { password == '' ? null :
                        <div>{password == confirmPw ? 
                        <p className="text-success">Passwords Match!</p> : <p className="text-danger">Passwords must match...</p>}
                    </div> }
            </div>
        )
    }

    function reset() {
        setAlert('');
        setField('')
        document.getElementById('update-submit').disabled = false;
        document.getElementById('update-form').reset();
    }

    return (
        <div>
            <div className="container-fluid bg-light bg-opacity-25 p-3 border border-2 rounded text-center">
                <h3 className="mb-2">Update Options</h3>
                <UpdateOptions />
            </div>
            <form onSubmit={submitUpdate} id="update-form" className="border border-2 rounded mt-4 p-3 bg_secondary-color">
                <h4 className="mt-2 text-white">Use this form to update your { field ? field : "information"}.</h4>
                {handleSelection(field)}
                { alert.message ? <LiveAlert message={alert.message} dismissable={false} flavor={alert.flavor} /> : null }
                <div className="footer d-flex justify-content-evenly mt-4">
                    <button type="submit" id="update-submit" className="btn btn-success">Update</button>
                    <button type="button" className="btn btn-light" onClick={reset}>Cancel</button>
                </div>
            </form>
        </div>
    )

}