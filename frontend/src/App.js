import {BrowserRouter, Routes, Route} from "react-router-dom";
import BookList from "./components/BookList";
import Login from "./components/Login";
import EditBook from "./components/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<BookList/>}/>
        <Route path="/edit/:id" element={<EditBook/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
