import express from "express";
import { 
    Login,
    borrowBook,
    createBook,
    deleteBook,
    deleteUser,
    getBookById,
    getBooks,
    getBorrow,
    getUser,
    getUserById,
    regisUser,
    returnBook,
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
router.post('/books', createBook);
router.patch('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/login', Login);
router.get('/borrow', getBorrow);
router.post('/borrow', borrowBook);
router.patch('/return', returnBook);


export default router;
