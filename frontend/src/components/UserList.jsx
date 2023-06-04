import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () =>{
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

  return (
        <div className='form'>
        <div className='card shadow p-3 mb-5 bg-body rounded'>
        <div className='card-body'>
            <div className='card-title mt-5'><h1>User List</h1>
                <Link to={`/home`} ><button className='button btn btn-outline-primary' >Home</button></Link>
            </div>
            <div className='table-responsive'>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className='nav-button'>
                                    <Link to={`/editUser/${user.id}`} ><button className='button btn btn-outline-primary'>Edit</button></Link>
                                    {' '}
                                    <button onClick={()=> deleteBook(user.id)} className='button btn btn-outline-danger'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
    )
}

export default UserList