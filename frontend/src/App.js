import {BrowserRouter, Routes, Route} from "react-router-dom";
import BookList from "./components/BookList";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<BookList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
