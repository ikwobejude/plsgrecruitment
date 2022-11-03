const express = require('express')
const receipt = express.Router();
const receiptController = require('../controllers/receptController');
const { applicantReports } = require('../controllers/reportController');


// revenue receipts 
receipt.get('/revenue_invoices', async(req, res) => {
    receiptController.viewRevenueReceipt(req, res);
})


// revenue invoices
receipt.get('/payment_incoices', async(req, res) => {
    receiptController.viewPaymentIn(req, res);
})


receipt.get('/application_report', async(req, res) => {
    applicantReports(req, res)
})
module.exports = receipt;