
const multer = require("multer");
const fs = require("fs");

const express = require('express');
const { 
  getAppli1_1, 
  postAppli1_1, 
  getApplica1_2, 
  postApplica1_2, 
  postApplic2_1, 
  getApplic2_1, 
  getApplic2_2, 
  postApplic2_2, 
  uploadFiles, 
  postuploadfiles, 
  applicantDetail, 
  getPreview, 
  deleteConsent,
  getState,
  getLga,
    deletEduc,
  deletePrevEmp,
  returniningApplicant,
  getReturning,
  applicantFileUp,
  update_review,
   getExaminationPass,
  postExaminationPass,
  editMDA,
  editInfo,
} = require('../controllers/ajaxController');
const { applicantFeeCheckpoint, initializePayment, initializSuccesspage, monifyInititialization, paymentResponse, getSuccessPaymentResponse, printslips } = require("../controllers/mandateController");
const api = express.Router();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //     cb(null, true);
    // } else {
    //     cb(null, fulse)
    // }
    if (
      file.mimetype.includes("image/jpeg") ||
      file.mimetype.includes("image/png") ||
      file.mimetype.includes("excel") ||
      file.mimetype.includes("spreadsheetml") ||
      file.mimetype.includes("application/pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 1,
    },
    fileFilter: fileFilter,
  });

  api.get('/Application_info', async(req, res) => {
    applicantDetail(req, res)
  })
api.route('/application')
.get(async(req, res) => {
    getAppli1_1(req, res)
})
.post(async(req, res)=>{
postAppli1_1(req, res)
})

api.route('/application_1_1')
.get(async(req, res) => {
getApplica1_2(req, res)
})
.post(async(req, res)=>{
    postApplica1_2(req, res)
})

api.route('/application_2_1')
.get(async(req, res) => {
getApplic2_1(req, res)
})
.post(async(req, res)=>{
    postApplic2_1(req, res)
})

api.route('/application_2_2')
.get(async(req, res) => {
getApplic2_2(req, res)
})
.post(async(req, res)=>{
    postApplic2_2(req, res)
})


api.route('/upload_documents')
.get(async(req, res) => {
    uploadFiles(req, res)
})
.post(upload.array('file', 30), async(req, res) => {
    postuploadfiles(req, res)
})

api.route("/review_application")
.get(async (req, res) => {
  getPreview(req, res);
})

.post(async(req, res)=> {
  update_review(req, res);
});


api.route('/Application_feee')
.get(async(req, res) => {
    applicantFeeCheckpoint(req, res)
})
.post(async(req, res) => {
    initializePayment(req, res);
})

api.post('/api_payment_response', async(req, res) => {
  getSuccessPaymentResponse(req, res)
})

api.route('/api_interface_web_payment')
.get(async(req, res)=> {
    initializSuccesspage(req, res)
})

api.get('/initialize_monify', async(req, res) => {
    monifyInititialization(req, res)
})


// delete routes 
api.get('/delet_concent', async(req, res)=> {
  deleteConsent(req, res)
})


api.get('/remove_academic', async(req, res)=> {
  deletEduc(req, res)
})


api.get('/remove_prev_employment', async(req, res)=> {
  deletePrevEmp(req, res)
}) 


api.get('/monnify/verify_payment', async(req, res) => {
  paymentResponse(req, res)
})



api.get('/client/api/getstate', async(req, res)=> {
     getState(req, res)
})

api.get('/client/api/getlga/:stateID', async(req, res)=> {
  getLga(req, res)
})

api
  .route("/returning_applicants")
  .get(async (req, res) => {
    getReturning(req, res);
  })
  .post(async (req, res) => {
    returniningApplicant(req, res);
  });


api.get('/chck_if_file_uploaded', async(req, res) => {
  applicantFileUp(req, res)
})

api.route('/subject_taken_and_grade')
.get(async(req, res) => {
    getExaminationPass(req, res)
})
.post(async(req, res) => {
  postExaminationPass(req, res)
})

api.get('/print_application_slips', async(req, res) => {
  printslips(req, res);
})

api.route('/update_mda')
.get (async(req, res) => {
  editMDA(req, res)
})
.post(async(req, res)=> {
  editInfo(req, res)
})

api.get('/help', async(req, res) => {
  res.render('./admin/help', {
    title: "help "
  })
})



module.exports = api;