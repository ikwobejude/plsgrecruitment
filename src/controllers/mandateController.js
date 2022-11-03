var unirest = require('unirest')
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db/db')
const { validateTin } = require("../config/validation");
const { assessment_item_invoices, assessment_items, assessments } = require("../model/assessmentModels");
const { tax_payers } = require("../model/texPayersmodels");
const { applicant, new_applications } = require('../model/applicant');
const { Api_Payments } = require('../model/paymentModel');


// module.exports.generateMandate_get = async (req, res) => {
//     res.render('./admin/mandate/generate_mandate')
// }

function taxrin(len) {
    len = len || 100;
    var nuc = "0123456789";
    var i = 0;
    var n = 0;
    s = "";
    while (i <= len - 1) {
        n = Math.floor(Math.random() * 4);
        s += nuc[n];
        i++;
    }
    return s;
}



module.exports.applicantFeeCheckpoint = async(req, res) => {
    try{
         let application = await new_applications.findOne({where:{process_number: req.query.piid}})
    // let appli = await applicant.findOne({where: {id: application.applicant_id}});
    // console.log(`https://payments.psirs.gov.ng/OpenPaymentsApi/validate_phone/${appli.phone}`)
    unirest.get(`https://payments.psirs.gov.ng/OpenPaymentsApi/validate_phone/${application.phone}`)
      .then(async (response) => {
        console.log(response.body)
        let data = response.body;
        // let taxpayer = await questioniares.findOne({ where: {id: tacid} });
        // res.send(taxpayer);
        if (data.status == "success") {
            application.update({ tin: data.tin, current_step:'6' }, { new: true })
            res.render('./admin/check_out', {
                title: "Applicant checkpoint", name: application.applicant_fullname, phone: application.phone, email: application.email, tin: data.tin, piid: req.query.piid
            })
        } else {
            let payload = {
                first_name: application.applicant_fullname,
                // surname: data1.surname,
                // other_names: data1.middlename,
                home_town: application.applicant_local_govt,
                nationality: "Nigeria",
                gender: application.gender,
                marital_status: application.marital_status,
                soo: "plateau state",
                payer_address: application.address_of_correspondence,
                lga: application.applicant_local_govt,
                emp_status: "Applicant",
                dob: application.dob,
                occupation: "Applicant",
                phone: application.phone,
                email: application.email,
                title: "mr",
                nin: "",
                bvn: "",
                source: "recruitment-portal-admin"
              };
              const myJSON = JSON.stringify(payload)
              unirest
                .post('https://payments.psirs.gov.ng/tin/register_user')
                .header("content-type", "application/json")
                .send(myJSON)
                .then(async (response) => {
                    console.log(response.body)
                    var retdata = response.body;
                    if (retdata.status == "success") {
                        application.update({ tin: retdata.tin, current_step:'6' }, { new: true })
                          .then(async (result1) => {
                           
                              res.render('./admin/check_out', {
                                  title: "Applicant checkpoint", name: application.applicant_fullname, phone: application.phone, email: application.email, tin: data.tin, piid: req.query.piid
                              })
                          })
                  
                        // req.flash("success", retdata.status);
                        // res.redirect(`/api/verify_tin?tin=${retdata.tin}`);
                      } else {
                        var d = retdata.errors;
                        console.log(d);
                        var array = Object.values(d);
                       
                        req.flash('danger', array);
                        res.redirect('back')
                      }
                })
        }
  
      })
      .catch(err => {
            console.log(err)
         req.flash('danger', err.mesage);
         res.redirect('back')
          })
    } catch(err){
        console.log(err)
         req.flash('danger', err.mesage);
         res.redirect('back')
    }
      
}  



module.exports.initializePayment =  async(req, res) => {
    try{

        console.log(req.body)
        let name = req.body.name;
        let Amount = req.body.amount;
        let Tin = req.body.tin;
        let email = req.body.email;
        let phome = req.body.phone;
        let inv = taxrin(20);
        let piid = req.body.piid
        let item_name = "RECRUITMENT FORM FEE"

        let Mda_reference = taxrin(6) + inv;
        let URL1 = 'https://plsgrecruitment.org/api_payment_response';

        
        let data = {
          "mda_id": "182",
          "mda_reference": `${Mda_reference}`,
          "tax_item": `${item_name}`,
          "tin": `${Tin}`,
          "amount": `${parseFloat(Amount).toFixed(2)}`,
          "callback_url": `${URL1}`,
          "tax_code": "45683"
        };
        console.log(data);

        unirest
          .post('https://payments.psirs.gov.ng/OpenPaymentsApi/initialize_transaction')
          .header("content-type", "application/json")
          .send(data)
          .then(async (response) => {

            console.log(response.body)
            var retdata = response.body;
            
            if(retdata.status == "failure"){
              res.status(200).json({err: retdata.message})
            } else {
              let finisheddetail = {
              invoice_number: retdata.billing_reference,
              assessment_ref: retdata.billing_reference,
              profile_ref: retdata.mda_reference,
              assessment_rule: piid,
              tax_payer_name: name,
              tax_payer_rin : Tin,
              assessment_amount : Amount,
              created_at : new Date() ,         
              assessment_date : new Date(),

             }
                let newAssessment = new assessments(finisheddetail);
                newAssessment.save().then(() => {
                    new_applications.update({current_step:'7'}, {where:{process_number: piid}}, {new:true});
                    res.status(200).json({msg: "", invoice: retdata.billing_reference})
                    // res.redirect(``)
                })
                .catch(err => {
                    let myswlError = err.parent;
                    
                     res.status(200).json({err: myswlError.sqlMessage})
                    // res.send(myswlError.sqlMessage)
            
            
                  })
            } 
            
            
            
          })
    } catch(error){
     res.status(200).json({err: error.message})
    }
}
module.exports.initializSuccesspage = async(req, res) => {
    let ass = await assessments.findOne({where:{invoice_number: req.query.payment_id}})
    res.render('./admin/payment_option', {
        title: "Payment", ass
    })
}


module.exports.monifyInititialization = async(req, res) => {
    try {
              let hosturl = 'https://payments.psirs.gov.ng/monnify/initialize_transaction';
              let callbackUrl = 'https://plsgrecruitment.org/monnify/verify_payment?paymentReference='+req.query.payment_ref;
          
              let payload = {
                brn: req.query.payment_ref,
                callback_url: callbackUrl
              }
          
              // console.log(payload)
              const myJSON = JSON.stringify(payload);
              // console.log(myJSON)
              unirest
                .post('https://payments.psirs.gov.ng/monnify/initialize_transaction')
                .header("content-type", "application/json")
                .send(myJSON)
                .then(async (response) => {
                  console.log(response.body)
                  var retdata = response.body;
                  let redUrl = retdata.redirect_to_url;
                  let msg = retdata.message;
                  let errcode = retdata.responseCode;
                  let reqSucc = retdata.requestSuccessful;
          
                  let reqMess = retdata.responseMessage;
          
                  if (redUrl) {
                    res.redirect(redUrl)
                  } else {
                    console.log(msg, reqMess)
                    req.flash("error", msg == "" ? reqMess : msg);
                    res.redirect("back");
                  }
          
                })
    } catch (error) {
        
    }
}

module.exports.getSuccessPaymentResponse = async(req, res) => {
    try {
        //   res.send(req.body);
    
    
          function btch(len) {
            len = len || 100;
            var nuc = "0123456789";
            var i = 0;
            var n = 0;
            s = "BTCHNO";
            while (i <= len - 1) {
              n = Math.floor(Math.random() * 4);
              s += nuc[n];
              i++;
            }
            return s;
          }
          let getEbillsPayJson = req.body;
          // $serviceId = '2344170253';
            console.log(getEbillsPayJson)
          let batchno = btch(20);
          let PaymentMethod = 'pirs';
    
          let billing_reference = getEbillsPayJson.billing_reference;
          let mda_reference = getEbillsPayJson.mda_reference;
          let amount = getEbillsPayJson.amount;
    
          let payload = {
            PaymentLogId: batchno,
            CustReference: req.body.billing_reference,
            AlternateCustReference: req.body.mda_reference,
            Amount: req.body.amount,
            PaymentMethod: req.body.PaymentMethod,
            PaymentReference: req.body.mda_reference,
            ServiceUrl:req.body.receipt,
            service_id: "123456789"
          };
          
          

          let crnt = new Date()
    
          let apiPaym = new Api_Payments(payload);
          apiPaym.save().then(async (result) => {
           
            let assess = await db.query(`UPDATE assessments SET settlement_status = 1, assessment_amount_paid='${payload.Amount}', settlement_date = '${crnt}' WHERE invoice_number = '${billing_reference}'`)
            let assssss = await assessments.findOne({where:{invoice_number:billing_reference }});
             new_applications.update({current_step:'8'}, {where:{process_number: assssss.assessment_rule}}, {new:true});
            res.send("200:OK")
          }).catch(err => {
            let myswlError = err.parent;
            
            
            res.send(myswlError.sqlMessage)
    
    
          })
        } catch (err) {
          res.send(err.message)
        }
}



module.exports.paymentResponse = async(req, res) => {
  let payment = req.query.paymentReference;
  let apipay = await Api_Payments.findOne({where:{CustReference: payment}});
 
 
    let payed = await assessments.findOne({where: {assessment_ref: payment}});
    
     
    let applicant = await db.query(`
    SELECT new_applications.*, organization.name as org_name, job_category.name as category, _countries.*, _states.*,_lga.*
     from new_applications 
    INNER JOIN organization on new_applications.org_id = organization.code
    INNER JOIN job_category on job_category.code = new_applications.job_position
    INNER JOIN progress on new_applications.process_number = progress.process_number 
    LEFT JOIN _countries ON _countries.country_id = new_applications.applicant_country
    LEFT JOIN _states ON _states.state_id = new_applications.state_of_origin
    LEFT JOIN _lga ON _lga.lga_id = new_applications.applicant_local_govt
    where new_applications.process_number = '${payed.assessment_rule}'
    
    `, {type: QueryTypes.SELECT});
    new_applications.update({current_step:'8'}, {where:{process_number: payed.assessment_rule}}, {new:true});
    res.render('./admin/success', {
      payed, applicant:applicant[0] , title: "success"
    })
  
}



module.exports.printslips = async(req, res) => {
    let piid = req.query.piid
    let payed = await assessments.findOne({where: {assessment_rule: piid}});
    let applicant = await db.query(`
     SELECT new_applications.*, organization.name as org_name, job_category.name as category, _countries.*, _states.*,_lga.*
     from new_applications 
    INNER JOIN organization on new_applications.org_id = organization.code
    INNER JOIN job_category on job_category.code = new_applications.job_position
    INNER JOIN progress on new_applications.process_number = progress.process_number 
    LEFT JOIN _countries ON _countries.country_id = new_applications.applicant_country
    LEFT JOIN _states ON _states.state_id = new_applications.state_of_origin
    LEFT JOIN _lga ON _lga.lga_id = new_applications.applicant_local_govt
    where new_applications.process_number = "${piid}"`, {type: QueryTypes.SELECT});
    res.render('./admin/success', {
      payed, applicant:applicant[0],  title: "success"
    })
    
    // res.send(applicant)
}


