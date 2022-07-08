import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import useToastContext from '../hooks/useToastContext';

export default (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(0)
  const addToast = useToastContext();
  const { loginUser } = useContext(UserContext)

  function badCredentials() {
    const el = document.getElementById('bad-credentials');
    el.style.display = 'block'
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = '/users/login'
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let session = {
      "authenticity_token": token,
      email,
      password,
      "remember_me": remember,
      "commit": "Log in"
    }
    let user = {
      email,
      password
    }
    await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user, session})
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 422) {
            return badCredentials();
        }
        addToast("Uh oh, something went wrong...")
        throw new Error("Network response was not ok.");
    })
    .then(response => {
        if (!response) { return }
        JSON.stringify(response);
        console.log(response)
        loginUser({ id: response.id, role: response.role, username: response.username })
        navigate('/my-recipes')
    })
    .catch(error => console.log(error.message));
  }

  return (
    <div className="vw-100 vh-100 bg_secondary-color d-flex align-items-center justify-content-center">
      <div>
        <h2 className="text-white text-center fst-italic mb-3">Let's Eat Well!</h2>
        <div className="container bg-light" style={{maxWidth: "500px"}}>
          <form onSubmit={handleSubmit} className="p-2 bg-white">
            <h3 className="text-center">Sign In</h3>
            <div className="mb-3 form-floating">              
              <input
                required
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter email"
              />
              <label className="form-label">Email address</label>
            </div>
            <div className="mb-3 form-floating">             
              <input
                required
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"                
              />
              <label className="form-label">Password</label>
            </div>
            <p id="bad-credentials" className="text-danger fst-italic" style={{display: 'none'}}>
              Invalid login attempt
            </p>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={()=> remember ? setRemember(false) : setRemember(true)}
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={email === '' || password === ''}>
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Signup disabled temporarily. Play around with: {<br/>}email: user-1@example.com {<br/>} password: password
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}