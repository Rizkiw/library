import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const BookList = () => {
    const [books, setBook] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () =>{
        const response = await axios.get('http://localhost:5000/books');
        setBook(response.data);
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            getBooks();
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='form'>
    <div className="card">
        <div className='card-body shadow p-3 mb-5 bg-body rounded'>
        <div className='card-title'><h1>Book List</h1></div>
        <div className="nav">
            <div className='nav-search'>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    />
            </div>
            <div className='nav-button'>
                    <Link to={`/user`} className='button'><button class="btn btn-outline-primary">Manage User</button></Link>
                    <Link to={`/`} className='button'><button class="btn btn-outline-danger">Logout</button></Link>
                    <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-outline-success"
                                table="table-to-xls"
                                filename="Books Data"
                                sheet="tablexls"
                                buttonText="Export to XLS"/>
            </div>
        </div>

        <div className='table-responsive'>
            <table className="table table-bordered table-hover " id='table-to-xls'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Book</th>
                        <th>Book Title</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                        {books.filter((val) => {
                            if (search === '') {
                                return val
                            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.genre.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.author.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.year.includes(search)) {
                                return val
                            }
                        }).map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td className='d-flex justify-content-around'><img src={`http://localhost:5000/${book.photo}`} alt='' className='w-50 h-50'/></td>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td id='button'>
                                    <div className='d-flex justify-content-around'>
                                    <Link to={`/edit/${book.id}`} className='button'><button className="btn btn-outline-info mx-3 my-3" >Edit</button></Link>

                                    <button onClick={()=> deleteBook(book.id)} className='btn btn-outline-danger mx-3 my-3 h-25'>Delete</button>

                                    <Link to={`/borrow/${book.id}`} className='button'><button className="btn btn-outline-info mx-3 my-3 h-50" >Borrow/Return</button></Link>
                                    </div>

                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
                <Link to={`/add`} className='button'><button className="btn btn-outline-primary">Add Book</button></Link>
 
        </div>
        </div>
    </div>
    </div>
    )
}

export default BookList