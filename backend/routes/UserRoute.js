import express from "express";
import { 
    Login,
    borrowBook,
    createBook,
    deleteBook,
    deleteUser,
    fileUpload,
    getBookById,
    getBooks,
    getBorrow,
    getUser,
    getUserById,
    regisUser,
    updateBook,
    updateUser
  } from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/users', regisUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', fileUpload('path'), createBook);
router.patch('/books/:id', fileUpload('path'), updateBook);
router.delete('/books/:id', deleteBook);
router.post('/login', Login);
router.get('/borrow', getBorrow);
router.post('/borrow', borrowBook);


export default router;
