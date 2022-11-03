const express = require('express');
const genMandate = require('../controllers/mandateController');
const mandate = express.Router();


mandate.route('/assessment/invoice')
    .get(async (req, res) => {
        res.render('./admin/mandate/generate_mandate')
    })
    .post(async (req, res) => {
        genMandate.getTapayersDetails(req, res);
    })

mandate.route('/generte_invoice')
    .get(async (req, res) => {
        genMandate.generateInvoice_get(req, res)
    })
    .post(async (req, res) => {
        genMandate.generateInvoice_post(req, res)
    });

mandate.route('/cancel_or_finish_transaction')
.post(async (req, res)=> {
    
    genMandate.deleteAssessmnt(req, res);
    // console.log(req.body)
})







module.exports = mandate;

