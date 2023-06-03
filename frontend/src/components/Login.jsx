import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/home");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div className="hero-body">
                <div className="container-sm ">
                    <div class="position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded card " style={{ width: '25vw' }}>
                        <div className="card-body">
                            <form onSubmit={Auth} className="box">
                                <div className="field">
                                    <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Login</h1></label>
                                    <div className="form-floating mb-3">
                                        <input type="text" id="floatingInput"
                                        className="form-control" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                </div>
                                <div className="form-floating">
                                        <input type="password" id="floatingPassword"
                                        className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label for="floatingPassword">Password</label>
                                </div>
                                <p className="has-text-centered">{msg}</p>
                                <div className="nav justify-content-center mb-3">
                                    <Link to={`/register`} className='button'><button class="btn btn-outline-primary">Register</button></Link>
                                </div>
                                <div className="nav justify-content-center">
                                    <button className="button" class="btn btn-outline-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Login