import express from "express";
import { 
    createBook,
    deleteUser,
    getBooks,
    getUser,
    getUserById,
    regisUser,
    updateUser
  } from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/users', regisUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/books', getBooks);
router.get('/books/:id', getUserById);
router.post('/books', createBook);



export default router;
