import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import BookList from "./components/BookList";
import Login from "./components/Login";
import EditBook from "./components/EditBook";
import AddBook from "./components/AddBook";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import RegisUser from "./components/RegisUser";
import BorrowBook from './components/BorrowBook';
import BorrowList from './components/BorrowList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<BookList/>}/>
        <Route path="/edit/:id" element={<EditBook/>}/>
        <Route path="/add" element={<AddBook/>}/>
        <Route path="/user" element={<UserList/>}/>
        <Route path="/editUser/:id" element={<EditUser/>}/>
        <Route path="/register" element={<RegisUser/>}/>
        <Route path="/borrow/:id" element={<BorrowBook/>}/>
        <Route path="/borrow" element={<BorrowBook/>}/>
        <Route path="/borrowlist" element={<BorrowList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
