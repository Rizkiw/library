import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBook] = useState([]);
    
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
    <div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>
                                    <Link to={`/edit/${book.id}`} className='button'><button >Edit</button></Link>
                                    {' '}
                                    <button onClick={()=> deleteBook(book.id)} className='button'>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BookList