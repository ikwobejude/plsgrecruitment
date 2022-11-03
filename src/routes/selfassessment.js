const express = require('express')
const self = express.Router();
const selfssessmentController = require('../controllers/selfssessmentController')


// revenue receipts 
self.get('/dashboard', async(req, res) => {
    selfssessmentController.selfAssessDashboard(req, res);
})


// revenue invoices
self.get('/payment_incoices', async(req, res) => {
    selfssessmentController.viewPaymentIn(req, res);
})
module.exports = self;