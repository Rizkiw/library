import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';


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
    <Form>
    <div className="position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded">
        <Card style={{ width: '50vw' }}>
        <Card.Body>
        <Card.Title><h1>Book List</h1></Card.Title>
        <Row className="mb-3">
        <Col xs={7}>
              <Form.Control
                type="text"
                className="input"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                />
        </Col>
        <Col>
        <div class='d-flex justify-content-between'>
        <div>
        <Link to={`/user`} className='button'><button class="btn btn-outline-primary">Manage User</button></Link>
        {' '}
        <Link to={`/`} className='button'><button class="btn btn-outline-danger">Logout</button></Link>
        </div>
        </div>
        </Col>
        </Row>

        <div className='column'>
            <Table striped bordered hover>
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
                        {books.filter((val) => {
                            if (search === '') {
                                return val
                            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.genre.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.author.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.year.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            }
                        }).map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>
                                    <Link to={`/edit/${book.id}`} className='button'><button class="btn btn-outline-info" >Edit</button></Link>
                                    {' '}
                                    <button onClick={()=> deleteBook(book.id)} className='button btn btn-outline-danger'>Delete</button>
                                    {' '}
                                    {/* <Link to={`/borrow/${book.id}`} className='button'><button class="btn btn-outline-info" >Borrow</button></Link> */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
                <Link to={`/add`} className='button'><button class="btn btn-outline-primary">Add Book</button></Link>
                {' '}
                <Link to={`/borrow`} className='button'><button class="btn btn-outline-info">Borrow</button></Link>
        </div>
        </Card.Body>
        </Card>
    </div>
    </Form>
    )
}

export default BookList