import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    };

  return (
    <div className="columns">
      <div className="position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded card " style={{ width: '25vw' }}>
        <form onSubmit={saveUser}>
            <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Register</h1></label>
          <div className="field">
            <div className="form-floating mb-3">
              <input
                type="text" id="floating"
                className="form-control"
                value={name}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
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
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <label for="floating">Confirm Password</label>
            </div>
          </div>
          <p>{msg}</p>
          <div className="nav justify-content-center">
            <button type="submit" className="button btn btn-outline-success">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisUser