import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBookById();
      }, []);

    const updateBook = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('author', author);
        formData.append('year', year);
        formData.append('path', photo);
        try {
          await axios.patch(`http://localhost:5000/books/${id}`, formData);
          navigate("/home");
        } catch (error) {
          console.log(error);
        }
    };

    const getBookById = async () => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setTitle(response.data.title);
        setGenre(response.data.genre);
        setAuthor(response.data.author);
        setYear(response.data.year);
        setPhoto(response.data.photo);
    };


  return (
    <div className="col">
      <div className=' shadow p-3 mb-5 bg-body rounded card-body'>
        <Link to={`/home`} ><button className='button btn btn-outline-primary mb-3' >Home</button></Link>
        <form onSubmit={updateBook}>
        <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Edit Book</h1></label>
          <div className="field mb-3">
            <div className="control">
              <div className="control d-flex justify-content-around">
                <img src={`http://localhost:5000/${photo}`} alt='' className='w-25 h-25 mb-3'/>
              </div>
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Book Title</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Genre</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              />
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Author</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Year</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
              />
            </div>
          </div>
          <div className="field mb-3">
            <button type="submit" className="button btn btn-outline-success">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook