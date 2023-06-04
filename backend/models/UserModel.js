import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Book = db.define('books', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: DataTypes.STRING
}, {
    freezeTableName : true
});

export default Book;
(async()=>{
    await db.sync();
})();