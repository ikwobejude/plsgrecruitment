
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE, process.env.NAME, process.env.DB_PASSWORD, {
//     dailect: 'mysql',
//     host: process.env.DB_HOST,
//     dialectOption: {
//         multipleStatements: true
//     }
// });


// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

'use strict';
const path = require('path')
const Sequelize = require('sequelize');
const db = {}
require('dotenv').config();

const DB = process.env.DATABASE
const USER =  process.env.NAME

const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST
const DIALECT = 'mysql'
const PORT = 3306

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: DIALECT,
        port: PORT
    }
)
module.exports = sequelize;