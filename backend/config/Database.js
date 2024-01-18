import {Sequelize} from "sequelize";

const db = new Sequelize('db_jebi','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;