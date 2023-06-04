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
    <div className="position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded">
        <div className='card' style={{ width: '50vw' }}>
        <div className='card-body'>
        <div className='card-title'><h1>Book List</h1></div>

        <div className="mb-3 row">
            <div className='col' xs={7}>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    />
            </div>
            <div className='col'>
                <div class='d-flex justify-content-between'>
                <div>
                <Link to={`/user`} className='button'><button class="btn btn-outline-primary">Manage User</button></Link>
                <Link to={`/`} className='button ms-3'><button class="btn btn-outline-danger">Logout</button></Link>
                <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-outline-success ms-3"
                            table="table-to-xls"
                            filename="Books Data"
                            sheet="tablexls"
                            buttonText="Export to XLS"/>
                </div>
                </div>
            </div>
        </div>

        <div className='column'>
            <table className="table table-bordered table-hover" id='table-to-xls'>
                <thead>
                    <tr>
                        <th>No</th>
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
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td id='button'>
                                    <Link to={`/edit/${book.id}`} className='button'><button class="btn btn-outline-info" >Edit</button></Link>
                                    {' '}
                                    <button onClick={()=> deleteBook(book.id)} className='button btn btn-outline-danger'>Delete</button>
                                    {' '}
                                    <Link to={`/borrow/${book.id}`} className='button'><button class="btn btn-outline-info" >Borrow / Return</button></Link>
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
    </div>
    )
}

export default BookList