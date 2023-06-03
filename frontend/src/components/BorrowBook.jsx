import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const BorrowBook = () => {
    const [users, setUser] = useState([]);
    const [borrows, setBorrow] = useState([]);
    const [search, setSearch] = useState('');
    const [msg, setMsg] = useState('');
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [statusBook, setStatusBook] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBookById();
        getUsers();
        getBorrow();
      }, []);

    const updateBorrow = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`http://localhost:5000/borrow`, {
            title,
            name,
            status,
            statusBook
          });
          navigate("/home");
        } catch (error) {
        setMsg(error.response.data.msg);
        }
        try {
          await axios.patch(`http://localhost:5000/books/${id}`, {
            status
          });
        } catch (error) {
          console.log(error);
        }
    };

    const getBookById = async () => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setTitle(response.data.title);
        setStatusBook(response.data.status);
    };

    const getUsers = async () =>{
      const response = await axios.get('http://localhost:5000/users');
      setUser(response.data);
    };

    const getBorrow = async () =>{
      const response = await axios.get('http://localhost:5000/borrow');
      setBorrow(response.data);
    };

  return (
    <div className="col">
      <div className='position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded card' style={{ width: '25vw' }}>
        <Link to={`/home`} ><button className='button btn btn-outline-primary mb-3' >Home</button></Link>
        <form onSubmit={updateBorrow}>
        <label className="label mb-3 nav justify-content-center"><h1 class="card-title ">Borrow / Return Book</h1></label>
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
          <div className="field mb-3">
            <label className="label">Name</label>
            <select className="form-select" onChange={(e) => setName(e.target.value)}>
            <option selected disabled>Select Name</option>
                {
                  users.map((val) => <option value={val.name}>{val.name}</option>)
                }
            </select>
          </div>
          <div className="field mb-3">
            <label className="label">Status Book</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={statusBook}
                onChange={(e) => setStatusBook(e.target.value)}
                placeholder="Title"
                disabled
              />
            </div>
          </div>
          <div className="field mb-3">
            <label className="label">Status</label>
            <select className="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
              <option selected disabled>Open this select menu</option>
              <option value='Borrowed'>Borrow</option>
              <option value='Returned'>Return</option>
            </select> 
          </div>
          <p>{msg}</p>
          <div className="field mb-3">
            <button type="submit" className="button btn btn-outline-success">
              Borrow Book
            </button>
          </div>
        </form>
        <label className="label mb-3"><h4 class="card-title ">History :</h4></label>
        <div className='col'>
            <table className="table table-bordered table-hover">
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