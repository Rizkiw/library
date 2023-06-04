import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const saveBook = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('genre', genre);
      formData.append('author', author);
      formData.append('year', year);
      formData.append('path', photo);

      try {
        await axios.post("http://localhost:5000/books", formData);
        navigate("/home");
      } catch (error) { 
        console.log(error);
      }
    };

  return (
    <div className="form">
      <div className='shadow p-3 mb-5 bg-body rounded card-body'>
        <form onSubmit={saveBook}>
        <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Add Book</h1></label>
        <label className="label " for="floating">Book Cover</label>
        <div className="mb-3">
              <input
                id='photo'
                type="file" name="path"
                className="form-control my-2"
                onChange={(e) => setPhoto(e.target.files[0])}
                placeholder="Choose book image"
              />
          </div>
          <div className="form-floating mb-3">
              <input
                type="text" id="title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <label className="label " for="floating">Book Title</label>
          </div>
          <div className="form-floating mb-3">
              <input
                type="text" id="genre"
                className="form-control"
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              />
              <label className="label" for="floating">Genre</label>
          </div>
          <div className="form-floating mb-3">
              <input
                type="text" id="author"
                className="form-control"
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
              <label className="label" for="floating">Author</label>
          </div>
          <div className="form-floating mb-3">
              <input
                type="number" id="year"
                className="form-control"
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