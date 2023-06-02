import express from "express";
import { 
    getUser,
    getUserById,
    regisUser
  } from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/users', regisUser);

export default router;
