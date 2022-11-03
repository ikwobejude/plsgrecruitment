const { assessments } = require("../model/assessmentModels")
const { tax_payers } = require("../model/texPayersmodels")


module.exports.selfAssessDashboard = async(req, res) => {
    
    let details = await tax_payers.findOne({where: {taxpayer_rin: req.user.username} })
    let assess = await assessments.findAll({where: {tax_payer_rin: req.user.username} })
    res.render('./self_assessment/dashboard', {
        details, assess
    })
}