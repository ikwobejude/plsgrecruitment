
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createTinAndAccount } = require("../config/validation")
const { states, local_government_area } = require("../model/texPayersmodels")






module.exports.validateReceipt = async (req, res) => {
    res.render('./home/validate_receipt')
}

module.exports.generateInvoice = async (req, res) => {

}


module.exports.generateTinAndAcc_get = async (req, res) => {
    let state = await states.findAll();
    let lga = await local_government_area.findOne({ where: { state_id: 5 } });
    res.render('generate_tin', {
        state,
        lga
    })
}

module.exports.storeTin = async (req, res) => {
    try {
        let { error, value } = createTinAndAccount.validate(req.body);
        if (error) {
            res.status(201).json({ msg: error.message })
        } else {
            let userInfo = {
                group_id: await groupId(value.usertype),
                name: value.fullname,
                username: value.email,
                password: await _Encrypt(value.password),
                email: value.email,
                user_phone: value.Number,
            }
            // let userInput = value.userType == "individual" ? await individual(value) : organization(value)
        }
    } catch (error) {

    }
}

async function groupId(utype) {
    return usertype == "individual" ? "190"
        : usertype == "corperte" ? "200"
            : usertype == "state_agency" ? "300"
                : "400";
}

async function _Encrypt(text) {
    return await bcrypt.hash(text, saltRounds);
}

await function individual(data) {
    let obj = {
        lastname: date.value,
        middlename: date.value,
        firstname: date.value,
        mobile_number_1: date.Number,
        email_addresss_1: date.email,
        tax_payer_type: date.usertype,
        contactaddress: date.value,
        state_id: date.state,
        lga_id: date.lga,
    }

    return obj;
}


fullname
email
Number
state
lga
password1