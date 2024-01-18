import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users',{
    title: DataTypes.STRING,
    writer: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    category: DataTypes.STRING,
    tag: DataTypes.STRING,
    cover: DataTypes.STRING,
    status: DataTypes.STRING
},{
    freezeTableName:true
});

export default User;

(async()=>{
    await db.sync();
})();