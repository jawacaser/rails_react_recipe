import React, { useState } from 'react';
import useToastContext from '../hooks/useToastContext';
import { Modal } from 'bootstrap';
import { LiveAlert } from './LiveAlert';

export default (props) => {
    const [email, setEmail] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const addToast = useToastContext();

    function success() {
        setAlertMsg(`Password Reset instructions have been sent to ${email}`)
        document.getElementById('pwReset-submit').disabled = true;
    }

    function reset() {
        const myModalEl = document.getElementById('pwReset-modal')
        const modal = Modal.getInstance(myModalEl)
        document.getElementById('pwReset-submit').disabled = false;
        document.getElementById('pwReset-form').reset();
        modal.hide();
    }

    async function handlePwReset(e) {
        e.preventDefault();
        const url = '/users/password'
        const token = document.querySelector('meta[name="csrf-token"]').content;
        let user = { email }

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
                return success();
            }
            addToast("Uh oh, something went wrong...")
            throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }

    return(
    <div className="modal fade" id="pwReset-modal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="pwResetModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modal-title">Forgot Password?</h5>
                    <button type="button" className="btn-close" onClick={reset} aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                    <h6 className="my-2">Enter your email address to receive a link to reset your password.</h6>                   
                    <form onSubmit={handlePwReset} id="pwReset-form">
                        <div className="mb-3 form-floating form-group">
                        <input
                            required
                            id="pwReset-email"
                            name="pwReset-email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email address"
                        />
                        <label className="form-label">Email address</label>
                        </div>
                        { alertMsg ? <LiveAlert message={alertMsg} dismissable={false} flavor={"success"} /> : null }
                        <div className="modal-footer">
                            <button type="submit" id="pwReset-submit" className="btn custom-button">Send Request</button>
                            <button type="button" className="btn btn-secondary" onClick={reset}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}