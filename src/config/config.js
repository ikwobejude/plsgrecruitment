require('dotenv').config();

const username = process.env.NAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;
const host = process.env.DB_HOST;
const node_env = process.env.NODE_ENV;
const session_secret = process.env.SESSION_SECRECT;

const config = {
    dev:{
        db:{
           username,
           password,
           database,
           host
        },
        session_secret
    },
    test:{},
    prod:{}
};

module.exports = config[node_env];