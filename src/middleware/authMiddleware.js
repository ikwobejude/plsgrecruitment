const jwt = require('jsonwebtoken');
const { Users } = require('../model/userModel');
require('dotenv').config();

const requireAuth = (req, res, next) => {


    const token = req.cookies.jwt;

    // check json web token exists & verified

    if (token) {
        jwt.verify(token, process.env.JWT_SECRECT, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                // console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

// chck current user

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRECT, async(err, decodedToken) => {
            if (err) {
                // console.log(err.message)
                res.locals.user = null;
                next();
            } else {
                // console.log(decodedToken);
                let user = await Users.findOne({ where: { id: decodedToken.id } })
                res.locals.user = user;
                req.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null;
        next()
    }
}



module.exports = {
    requireAuth, checkUser
}
