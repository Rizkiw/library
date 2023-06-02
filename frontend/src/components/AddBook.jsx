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
    <div className="columns">
      <div className="column">
        <form onSubmit={saveBook}>
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
            <label className="label">Genre</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Author</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Year</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook