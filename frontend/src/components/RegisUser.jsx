import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const RegisUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
  
    const saveUser = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/users", {
            name,
            email,
            password,
            confPassword
        });
        navigate("/");
      } catch (error) {
        setMsg(error.response.data.msg);
      }
      try {
        await axios.post('http://localhost:5000/users', {
            email: email,
            password: password
        });
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      }
    };

  return (
    <div className="form">
      <div className="shadow p-3 mb-5 bg-body rounded card">
      <Link to={`/`} ><button className='button btn btn-outline-primary mb-3' >Home</button></Link>
        <div className="card-body-regis">
        <form onSubmit={saveUser}>
          <label><h1 class="card-title ">Register</h1></label>
          <div className="field">
            <div className="form-floating mb-3">
              <input
                type="text" id="floating"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <label for="floating">Name</label>
            </div>
          </div>
          <div className="field">
            <div className="form-floating mb-3">
              <input
                type="text"id="floating"
                className="form-control"
                onChange={(e) => 
                  setEmail(e.target.value)}
                placeholder="Email"
              />
              <label for="floating">Email</label>
            </div>
          </div>
          <div className="field">
            <div className="form-floating mb-3">
              <input
                type="password" id="floating"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
             <label for="floating">Password</label>
            </div>
          </div>
          <div className="field">
            <div className="form-floating mb-3">
              <input
                type="password" id="floating"
                className="form-control"
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <label for="floating">Confirm Password</label>
            </div>
          </div>
          <p>{msg}</p>
          <div className="nav">
            <button type="submit" className="button btn btn-outline-success">
              Register
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default RegisUser