import React, { useState, useContext } from 'react';
import { LiveAlert } from './LiveAlert';
import useToastContext from '../hooks/useToastContext';
import UserContext from '../contexts/UserContext';

export const UpdateUserForm =(props)=> {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [field, setField] = useState('')
    const addToast = useToastContext();
    const { currentUser } = useContext(UserContext)

    function handleSelection(selection) {
        if (!selection) { 
            return (<h3 className="fst-italic">Select a field to update...</h3>)
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
                        placeholder="Enter password"                
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
                        placeholder="Confirm password"
                    />
                    <label className="form-label">Confirm Password</label>
                    </div>
                    { password == '' ? null :
                        <div>{password == confirmPw ? 
                        <p className="text-success">Passwords Match!</p> : <p className="text-danger">Passwords must match...</p>}
                    </div> }
                    { alertMsg ? <LiveAlert message={alertMsg} dismissable={true} /> : null }
            </div>
        )
    }

    function reset() {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPw('');
        setAlertMsg('');
        setField('')
        document.getElementById('update-submit').disabled = false;
        document.getElementById('update-form').reset();
    }

    function handleUpdateUser(e) {
        e.preventDefault();
        return addToast("clicked submit")
    }

    return (
        <div className="text-center">
            <h2>Update Options</h2>
            <UpdateOptions />
            <h6 className="mt-4">Use this form to update your information.</h6>                   
            <form onSubmit={handleUpdateUser} id="update-form">
                {handleSelection(field)}
                <div className="footer d-flex justify-content-evenly mt-2">
                    <button type="submit" id="update-submit" className="btn btn-success">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={reset}>Cancel</button>
                </div>
            </form>
        </div>
    )

}