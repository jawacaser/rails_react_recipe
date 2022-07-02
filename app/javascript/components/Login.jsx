import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(0)
  
  function onChange(e) {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    } else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
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
        }
        throw new Error("Network response was not ok.");
    })
    .then(response => {    
        sessionStorage.setItem('username', JSON.stringify(response.username))  
        navigate(`/my-recipes`)
    })
    .catch(error => console.log(error.message));
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={onChange}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={onChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>
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
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="#">Sign up</a>
        </p>
        <p className="forgot-password text-right">
          <a href="#">Forgot password?</a>
        </p>
      </form>
    </div>
  )
}