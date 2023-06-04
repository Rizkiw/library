import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))
app.use(UserRoute);

app.listen(5000, ()=> console.log("Server up and running on port 5000"));