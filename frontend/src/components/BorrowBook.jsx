import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BorrowBook = () => {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBookById();
      }, []);

    const updateBorrow = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`http://localhost:5000/borrow`, {
            title,
            name,
            status
          });
          navigate("/home");
        } catch (error) {
          console.log(error);
        }
    };

    const getBookById = async () => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setTitle(response.data.title);
    };


  return (
    <div className="columns">
      <div className="column">
        <form onSubmit={updateBorrow}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Genre"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Author"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BorrowBook