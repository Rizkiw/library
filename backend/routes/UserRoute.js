import express from "express";
import { getUser } from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUser);

export default router;
