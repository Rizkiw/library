import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DataGrid, GridColumn} from 'rc-easyui';


const BorrowList = () => {
    const [borrow, setBorrow] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getBorrow();
    }, []);

    const getBorrow = async () =>{
        const response = await axios.get('http://localhost:5000/borrow');
        setBorrow(response.data);
    };


  return (
    <div className='form'>
    <div className="">
        <div className='card-body shadow p-3 mb-5 bg-body rounded'>
        <div className='card-title'><h1>Borrow/Return List</h1></div>
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
                    <Link to={`/home`} className='button'><button class="btn btn-outline-primary">Home</button></Link>
                    <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-outline-success"
                                table="table-to-xls"
                                filename="Status Book Data"
                                sheet="tablexls"
                                buttonText="Export to XLS"/>
            </div>
        </div>

             <div>
                <DataGrid data = {borrow.filter((val) => {
                            if (search === '') {
                                return val
                            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.status.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            }
                                })}>                
                    <GridColumn field="title" title="Book Title" width="30%"></GridColumn>
                    <GridColumn field="name" title="Name"></GridColumn>
                    <GridColumn field="status" title="Status" align="center"></GridColumn>
                </DataGrid>
            </div>

        {/* <div className='table-responsive'>
            <table className="table table-bordered table-hover " id='table-to-xls'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Book Title</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                        {borrow.filter((val) => {
                            if (search === '') {
                                return val
                            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            } else if (val.status.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            }
                                }).map((borrow, index) => (
                                    <tr key={borrow.id}>
                                        <td>{index + 1}</td>
                                        <td>{borrow.title}</td>
                                        <td>{borrow.name}</td>
                                        <td>{borrow.status}</td>
                            </tr>
                             ))
                        }
                </tbody>
            </table>
        </div> */}
        </div>
    </div>
    </div>
    )
}

export default BorrowList