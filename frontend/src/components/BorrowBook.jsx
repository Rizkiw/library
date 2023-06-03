import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const BorrowBook = () => {
    const [users, setUser] = useState([]);
    const [books, setBook] = useState([]);
    const [borrows, setBorrow] = useState([]);
    const [msg, setMsg] = useState('');
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [statusBook, setStatusBook] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBookById();
        getBooks();
        getUsers();
        getBorrow();
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
        setMsg(error.response.data.msg);
        }
    };

    const getBookById = async () => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setTitle(response.data.title);
    };

    const getBooks = async () =>{
      const response = await axios.get('http://localhost:5000/books');
      setBook(response.data);
    };  

    const getUsers = async () =>{
      const response = await axios.get('http://localhost:5000/users');
      setUser(response.data);
    };

    const getBorrow = async () =>{
      const response = await axios.get('http://localhost:5000/borrow');
      setBorrow(response.data);
    };

    console.log(borrows)
  return (
    <div className="col">
      <div className='position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded card' style={{ width: '25vw' }}>
        <form onSubmit={updateBorrow}>
        <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Borrow Book</h1></label>
        <div className="field mb-3">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                disabled
              />
            </div>
          </div>
          {/* <div className="field mb-3">
            <label className="label">Title</label>
            <select class="form-select" onChange={(e) => setTitle(e.target.value)}>
            <option selected>Select Book</option>
                {
                  books.map((val) => <option value={val.title}>{val.title}</option>)
                }
            </select>
          </div> */}
          <div className="field mb-3">
            <label className="label">Name</label>
            <select class="form-select" onChange={(e) => setName(e.target.value)}>
            <option selected>Select Name</option>
                {
                  users.map((val) => <option value={val.name}>{val.name}</option>)
                }
            </select>
          </div>
          <div className="field mb-3">
            <label className="label">Status</label>
            <div className="control">
            <input
                type="text"
                className="form-control"
                value={borrows}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                disabled
              />
                {/* {borrows.filter((val) => {
                  if ( title === ''){
                    return val
                  } else if (val.title.toLowerCase().includes(title.toLowerCase())) {
                    return val
                }
            })} */}
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Status</label>
            <select class="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
              <option selected>Open this select menu</option>
              <option value='Borrowed'>Borrow</option>
              <option value='Returned'>Return</option>
            </select> 
          </div>
          <p>{msg}</p>
          <div className="field mb-3">
            <button type="submit" className="button btn btn-outline-primary">
              Borrow Book
            </button>
          </div>
        </form>

        <div className='col'>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                        {borrows.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.name}</td>
                                <td>{book.status}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default BorrowBook