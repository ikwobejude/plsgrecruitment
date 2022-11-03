const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { valideteUsersignup, loginUser, createTinAndAccount } = require('../config/validation');
const { individual, companies } = require('../model/assessmentModels');
const { states, local_government_area } = require('../model/texPayersmodels');
const saltRounds = 10;

const { Users } = require("../model/userModel");

require('dotenv').config();
const masAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRECT, {
        expiresIn: masAge
    })
}


function taxrin(len) {
    len = len || 100;
    var nuc = "0123456789";
    var i = 0;
    var n = 0;
    s = '22';
    while (i <= len - 1) {
        n = Math.floor(Math.random() * 4);
        s += nuc[n];
        i++;
    }
    return s;
}


// error handler 
const handleError = (err) => {
    return err;
}

module.exports.signup_get = async (req, res) => {
    // let state = await states.findAll(); 
    // let lga = await local_government_area.findOne({ where: { state_id: 5 } }); 
    res.render("./auth/signup", {
        // state,
        // lga,
    })
}

async function _Encrypt(text) {
    return await bcrypt.hash(text, saltRounds);
}

module.exports.signup_post = async (req, res) => {

    try {
        const { error, value } = createTinAndAccount.validate(req.body)
        if (error) {
            res.status(201).json({ "err": error.message })
        } else {
            let userInpt = {
                group_id:   value.usertype == "Individual" ? "190":  value.usertype == "Corperate" ? "200":  value.usertype == "State Agency" ? "300": "400",
                name: value.name,
                username: taxrin(8),
                password:  await bcrypt.hash(value.password1, saltRounds),
                email: value.email,
                user_phone: value.number, 
            }

            console.log(userInpt)

            let input = new Users(userInpt);
            input.save().then(async(newUser) => {
                // const token = createToken(newUser.id);
                // res.cookie('jwt', token, { httpOnly: true, masAge: masAge * 1000 })
                let tin = userInpt.username;
                if(value.usertype == "Individual"){
                    let userType = await individul(value, tin);
                    console.log(userType)
                    let newIndividual = new individual(userType);
                    newIndividual.save().then(() => {
                        // sendEmail(userInpt);
                        res.status(200).json({ tin:tin })
                    })
                } else {
                    let userType = await companyDetails(value, tin)
                    let newCopertive = new companies(userType);
                    newCopertive.save().then(() => {
                        // sendEmail(userInpt);
                        res.status(200).json({ tin:tin })
                    })
                }
            })
        }

    } catch (error) {

        console.log(error)
        const err = handleError(error);

        res.status(400).json({ err });
    }

}

module.exports.login_get = async (req, res) => {
    res.render("./auth/login", {
        tin: req.query.tin_number !=''? req.query.tin_number : ""
    })
}

module.exports.login_post = async (req, res) => {
    try {
        const { error, value } = loginUser.validate(req.body)


        if (error) {
            let err = handleError(error)
            res.status(201).json({ "err": err.message })
        } else {
            const userInfo = await findUser(value.username, value.password);
            const token = createToken(userInfo.id);
            res.cookie('jwt', token, { httpOnly: true, masAge: masAge * 1000 })
            res.status(200).json({ user: userInfo.group_id })
        }
    } catch (error) {
        let err = handleError(error)
        res.status(201).json({ "err": err.message })
    }

}


// success login
module.exports.loginSuccess = async(req, res) => {
    let dt = req.user;
    if(dt.group_id == 111111){
        res.redirect('/admin/dashboard')
    } else if (dt.group_id == 190){
        res.redirect('/self/assessment/dashboard')
    }
}

async function findUser(username, password) {
    const user = await Users.findOne({ 
        where : { [Op.or] : [
            {username: username},
            {email: username}
        ]} })

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect Password')
    }
    throw Error('incorrect username')
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}


async function individul(data, tin){
    let obj = {
        user_rin: tin,
        individual_name: data.name,
        individual_tin: tin,
        mobile_number_1: data.number,
        email_addresss_1: data.email,
        tax_payer_type: data.usertype,
        state_id: data.state,
        lga_id: data.lga_id,
    }

    return obj;
}

async function companyDetails(data, tin){
    let obj = {
        company_rin: tin,
        company_name: data.name,
        mobile_number: data.number,
        email_addresss: data.email,
        tax_payer_type: data.usertype,
        state_id: data.state,
        lga_id: data.lga_id,
    }

    return obj;
}



 function groupId(utype) {
    return 
}
