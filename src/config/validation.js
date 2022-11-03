const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };

const valideteUsersignup = Joi.object({
    name: Joi.string().required(),
    // username: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    user_phone: Joi.number().integer().min(10).required()
})


const loginUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

})

const validateTin = Joi.object({
    tin: Joi.number().integer().required()
})

const createTinAndAccount = Joi.object({
    usertype: Joi.string(),
    name: Joi.string().required(),
    email:  Joi.string().email().required(),
    number: Joi.number().integer().min(10).required(),
    state: Joi.number().integer().required(),
    lga_id:Joi.number().integer().required(),
    password1: passwordComplexity(complexityOptions),
    password2: Joi.ref('password1')
})

const applicantInf = Joi.object({
    name : Joi.string().required(),
    org : Joi.string().required(),
    email : Joi.string().email().required(),
    phone : Joi.number().integer().min(11).required(),
    sumarry : Joi.string().allow('', null),
})


const stepone = Joi.object({
    applicant_fullname : Joi.string().required(),
    other_names : Joi.string().allow('', null),
    job_position : Joi.string().required(),
    job_position2 : Joi.string().allow('', null),
    date_available_for_employment : Joi.date().required(),
    highest_education : Joi.string().required(),
    address_of_correspondence : Joi.string().allow('', null),
    last_place_of_residence_outside_nigeria : Joi.string().allow('', null),
    age_last_birthday : Joi.string().allow('', null),
    dob : Joi.date().allow('', null),
    name_race_ethnicity_of_father : Joi.string().required(),
    fathers_present_occupation : Joi.string().required(),
    fathers_present_address : Joi.string().required(),
    name_race_ethnicity_of_mother : Joi.string().required(),
    process_number : Joi.string().allow('', null),
    applicant_id : Joi.string().allow('', null),
    org_id : Joi.string().allow('', null),
    email : Joi.string().allow('', null),
    phone : Joi.string().allow('', null),
})

module.exports = {
    valideteUsersignup, loginUser, validateTin, createTinAndAccount, applicantInf, stepone
}