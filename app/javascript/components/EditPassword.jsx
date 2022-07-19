import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import useToastContext from '../hooks/useToastContext';
import SignUpModal from './SignUpModal';
import { LiveAlert } from './LiveAlert';

export default (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const addToast = useToastContext();
  const { loginUser, currentUser } = useContext(UserContext)
  const [searchParams, setSearchParams] = useSearchParams();
  let pwToken = searchParams.get("reset_password_token")

  useEffect(()=> {
    if (currentUser.email) {
      navigate('/recipes')
    }
  })

  async function handleSubmit(event) {
    event.preventDefault();
    const url = '/users/password'
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let user = {
      password,
      confirmPw,
      "reset_password_token": pwToken,
      "commit": "Change my password"
    }
    
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
        // } else if (response.status === 422) {
        //     return badCredentials();
        }
        addToast("Uh oh, something went wrong...")
        throw new Error("Network response was not ok.");
    })
    .then(response => {
        if (!response) { return }
        JSON.stringify(response);
        loginUser({ id: response.id, role: response.role, username: response.username, email: response.email  })
        addToast("Password Updated!")
        navigate('/my-recipes', { replace: true })
    })
    .catch(error => console.log(error.message));
  }

  return (
    <div className="vw-100 vh-100 bg_secondary-color d-flex align-items-center justify-content-center">
      <div>
        <div className="container bg-light p-4" style={{maxWidth: "500px"}}>
          <form onSubmit={handleSubmit} className="p-2 bg-white" id="pw-reset">
            <h3 className="text-center mb-2">Enter New Password</h3>
            <div className="mb-3 form-floating form-group">             
              <input
                required
                id="new-password"
                name="new-password"
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
                id="confirm-new-password"
                name="confirm-new-password"
                type="password"
                minLength={6}
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
            { alertMsg ? <LiveAlert message={alertMsg} dismissable={false} /> : null }
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <div className="mb-3 d-flex gap-2 row mx-2">
            <SignUpModal />
            <Link to="/login" className="btn border border-dark" style={{backgroundColor : "#C1E1C1"}}>
              Login
            </Link>
            <button className="btn border border-dark" style={{backgroundColor : "#C1E1C1"}} data-bs-toggle="modal" data-bs-target="#signup-modal">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}