import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from '../components/BookList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<BookList />}/>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
