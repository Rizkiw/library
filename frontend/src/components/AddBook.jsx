import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const navigate = useNavigate();
  
    const saveBook = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/books", {
            title,
            genre,
            author,
            year
        });
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="col">
      <div className='position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded card' style={{ width: '25vw' }}>
        <form onSubmit={saveBook}>
        <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Add Book</h1></label>
          <div className="form-floating mb-3">
              <input
                type="text" id="floating"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <label className="label " for="floating">Book Title</label>
          </div>
          <div className="form-floating mb-3">
              <input
                type="text" id="floating"
                className="form-control"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              />
              <label className="label" for="floating">Genre</label>
          </div>
          <div className="form-floating mb-3">
              <input
                type="text" id="floating"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
              <label className="label" for="floating">Author</label>
          </div>
          <div className="form-floating mb-3">
              <input
                type="number" id="floating"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
              />
              <label className="label" for="floating">Year</label>
          </div>
          <div className="field">
            <button type="submit" className="button btn btn-outline-success">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook