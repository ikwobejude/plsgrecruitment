const express = require('express')
const adminController = require('../controllers/adminController')
const admin = express.Router();


admin.route('/dashboard')
    .get(async (req, res) => {
        adminController.adminDashboard(req, res);
    })

admin.route('/get_mdas')
    .get(async(req, res) => {
        adminController.creatMda(req, res)
    })
admin.route('/get_job_categories')
    .get(async(req, res) => {
        adminController.getJobCategory(req, res)
    })


admin.route('/admin_view_applications')
.get(async(req, res) => {
    adminController.get_applicants(req, res)
})


admin.route('/application')
.get(async(req, res) => {
    adminController.getApplicationD(req, res)
})

admin.route('/get_mdas')
    .get(async(req, res) => {
        adminController.creatMda(req, res)
    })
admin.route('/payment_by_agencies')
.get(async(req, res)=> {
    adminController.paymentByagent(req, res);
})

admin.route('/chart_payment_by_assessment')
.get(async(req, res)=> {
    adminController.assessmets(req, res);
})

admin.route('/chart_pay_assessment_item')
.get(async(req, res)=> {
    adminController.paymentByItem(req, res);
})

module.exports = admin;