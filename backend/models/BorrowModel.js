import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Borrow = db.define('borrow', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
}, {
    freezeTableName : true
});

export default Borrow;

(async()=>{
    await db.sync();
})();