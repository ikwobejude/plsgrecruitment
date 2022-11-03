const { Sequelize, QueryTypes } = require('sequelize');
const db = require('../db/db');
const { job_category, organization } = require('../model/applicant');

module.exports.getReportSpace = async(req, res) => {
    let jobCategory = await job_category.findAll();
    let mda = await organization.findAll();
    res.render('', {
        jobCategory, mda
    })

}


module.exports.applicantReports = async(req, res) => {
    try {
            
        let perPage = 20;   // number of records per page
        var page = req.query.page || 1
        let offset = perPage * page - perPage;

        let sql = `
        SELECT
        new_applications.*, job_category.name as position, organization.name as mda, _countries.*, _states.*,  _lga.*
    FROM
        new_applications
    LEFT JOIN job_category ON new_applications.job_position = job_category.code
    LEFT JOIN organization on organization.code = new_applications.org_id
    LEFT JOIN _countries ON _countries.country_id = new_applications.applicant_country
    LEFT JOIN _states ON _states.state_id = new_applications.state_of_origin
    LEFT JOIN _lga ON _lga.lga_id = new_applications.applicant_local_govt where application_code IS NOT NULL `;

  
    if(req.query.position){
        sql += ` AND  new_applications.job_position = ${req.query.position} `;
    }

    if(req.query.mda){
        sql += ` AND new_applications.org_id= ${req.query.mda}`;
    }

    if(req.query.name){
        sql += ` AND new_applications.process_number= ${req.query.name}`;
    }

    if(req.query.from && req.query.to ){
        sql += ` AND date(new_applications.application_date) BETWEEN '${req.query.from}' AND '${req.query.to}'`;
    }
    let cnt = await db.query(sql, { type: QueryTypes.SELECT }); // for  count to capture the totaal number before appending the limit
    let count = cnt.length;
    sql += ` LIMIT ${perPage} OFFSET ${offset};`

    let view_mandate = await db.query(sql, { type: QueryTypes.SELECT });
    let jobCategory = await job_category.findAll();
    let mda = await organization.findAll();
    console.log(count)
    
    let uri2 = `/application_report?name=${req.query.name}&mda=${req.query.mda}&position=${req.query.position}&from=${req.query.from}&to=${req.query.to}search=1`;
    let uri1 = "/application_report?"
    res.render('./admin/applicantion_reports', {
        view_mandate,
        current: page,
        pages: Math.ceil(count / perPage),
        jobCategory,
        mda,
        title: 'Report',
        uri2, uri1, search:1
    })
    } catch (error) {
        console.log(error)
        // req.flash('danger', error.message)
        // res.redirect('back')
    }
}





module.exports.transactionReport = async (req, res) => {

    let perPage = 20;   // number of records per page
    var page = req.query.page || 1
    let offset = perPage * page - perPage;


    let sql = `
        SELECT
            *
        FROM
            assessments
        JOIN tax_payers ON assessments.tax_payer_rin = tax_payers.taxpayer_rin
        LEFT JOIN users ON assessments.created_by = users.username
        JOIN tax_offices ON assessments.tax_office_id = tax_offices.id_tax_office
    `;

    if(req.query == ""){
        sql +=` WHERE `  
    }

    if(req.query.tax_payer_name){
        sql +=` AND assessments1.tax_payer_name like  '%${req.query.tax_payer_name}%'`
    }

    if(req.query.id_tax_offices){
        sql +=` AND assessments1.tax_office_id like  '%${req.query.id_tax_offices}%'`
    }

    if(req.query.tax_payer_rin){
        sql +=` AND assessments1.tax_payer_rin like  '%${req.query.tax_payer_rin}%'`
    } 

    if(req.query.invoice_number){
        sql +=` AND assessments1.invoice_number like  '%${req.query.invoice_number}%'`
    } 
    
    if(req.query.from & req.query.to){
        sql +=` AND assessments1.tax_payer_name like  '%${req.query.tax_payer_name}%'`
    }

    sql += `LIMIT ${perPage} OFFSET ${offset};`



    let view_mandate = db.query(sql, {type: QueryTypes.SELECT});
    res.render('', {
        view_mandate
    })
}