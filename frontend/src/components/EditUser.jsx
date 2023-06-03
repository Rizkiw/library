import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
      }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
          await axios.patch(`http://localhost:5000/users/${id}`, {
            name,
            email
          });
          navigate("/user");
        } catch (error) {
          console.log(error);
        }
    };

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
    };


  return (
    <div className="col">
      <div className='position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded'>
        <form onSubmit={updateUser}>
        <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Edit</h1></label>
          <div className="field mb-3">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          
          <div className="field">
            <button type="submit" className="button btn btn-outline-success">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser