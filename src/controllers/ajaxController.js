const { new_applications, job_category, education_new, previous_employment, consents, progress, document, applicant, marital_status, _states, _lgas, gender, religions, 
  organization,
  months, examination_pass} = require("../model/applicant");
const db = require("../db/db");

const { Sequelize, QueryTypes } = require("sequelize");
const Op = Sequelize.Op;
const { _countries } = require("../model/texPayersmodels");
const { applicantInf, stepone } = require("../config/validation");
const { emailapplicant } = require("../config/email_service");




function taxrin(len) {
    len = len || 100;
    var nuc = "0123456789";
    var i = 0;
    var n = 0;
    s = '22';
    while (i <= len - 1) {
        n = Math.floor(Math.random() * 4);
        s += nuc[n];
        i++;
    }
    return s;
}

module.exports.applicantDetail = async(req, res) => {
    
    let {error, value} = applicantInf.validate(req.query)
    if(error){
      req.flash('danger', error.message.split('"').join(''));
      res.redirect('back')
    } else {
      try{
        console.log(req.query)
        let payl = {
          first_name: value.name,
          email: value.email,
          phone: value.phone,
          sumarry: value.sumarry,
        }
        let applic = await newfindApplication(value.phone, value.org, value.email)
         if(applic){
            let step =  applic.current_step;
              console.log(step)
              // let label = {}
              if(step == 1){
                res.redirect(`/application?piid=${applic.process_number}`)
              } else if (step == 2) {
                res.redirect(`/application_1_1?piid=${applic.process_number}`)
              }else if (step == 3) {
                res.redirect(`/application_2_1?piid=${applic.process_number}`)
              }else if (step == 4) {
                res.redirect(`/application_2_2?piid=${applic.process_number}`)
              } else if(step == 10){
                  res.redirect(`/subject_taken_and_grade?piid=${applic.process_number}`)
              } else if (step == 5) {
                res.redirect(`/upload_documents?piid=${applic.process_number}`)
              }else if (step == 6) {
                res.redirect(`/Application_feee?piid=${applic.process_number}`)
              } else if (step == 7) {
                let ass = await assessments.finOne({where:{assessment_rule: applic.process_number}})
                res.redirect(`/api_interface_web_payment?piid=${ass.invoice_number}`)
              } else if (step == 8) {
                let ass = await assessments.finOne({where:{assessment_rule: applic.process_number}})
                res.redirect(`/print_application_slips?piid=${ass.invoice_number}`)
              } else {
                res.redirect('/')
              }
         } else {
            let newApplicant = new applicant(payl);
            newApplicant.save().then(async() => {
              let appl = await applicant.findOne({where:{email: value.email}})
              res.redirect(`/application?org=${value.org}&name=${value.name}&id=${appl.id}&phone=${payl.phone}&email=${payl.email}`)
            })  
          }
    
        
      } catch(error) {
        console.log(error)
        req.flash('danger', error.message.split('"').join(''));
        res.redirect('back')
      }
    }
}


module.exports.getAppli1_1 = async(req, res) => {
    let job_cate = await job_category.findAll();
    let org = req.query.org;
    let name = req.query.name;
    let id = req.query.id;
    let email = req.query.email;
    let phone = req.query.phone;


    let application = req.query.piid ? await new_applications.findOne({where: {process_number: req.query.piid}}) : ""
    res.render('application_step_1', {
        job_cate, application, piid: req.query.piid?req.query.piid:'', org, name, id, email, phone
    })
}
  
module.exports.postAppli1_1 = async (req, res) => {
    // console.log(req.body);
    let  value = req.body;
    // if(error) {
    //   res.status(201).json({ err: error.message });
    // } else {
      try {
        //   console.log(req.body)
          if(req.query.piid){
              let pyl = {
                  applicant_fullname : value.applicant_fullname,
                  other_names : value.other_names,
                  job_position : value.job_position,
                  job_position2 : value.job_position,
                  date_available_for_employment : value.date_available_for_employment,
                  highest_education : value.highest_education,
                  present_employment_detail : value.present_employment_detail,
                  address_of_correspondence : value.address_of_correspondence,
                  last_place_of_residence_outside_nigeria : value.last_place_of_residence_outside_nigeria,
                  age_last_birthday : value.age_last_birthday,
                  dob : value.dob,
                  name_race_ethnicity_of_father : value.name_race_ethnicity_of_father,
                  fathers_present_occupation : value.fathers_present_occupation,
                  fathers_present_address : value.fathers_present_address,
                  name_race_ethnicity_of_mother : value.name_race_ethnicity_of_mother,
              }
              await new_applications.update(pyl, {where: {process_number: req.query.piid}})
              res.status(200).json({msg: "done", data: req.query.piid})
          } else {
              let pyl = {
                  applicant_fullname : value.applicant_fullname,
                  other_names : value.other_names,
                  job_position : value.job_position,
                  job_position2 : value.job_position,
                  date_available_for_employment : value.date_available_for_employment,
                  highest_education : value.highest_education,
                  present_employment_detail : value.present_employment_detail,
                  address_of_correspondence : value.address_of_correspondence,
                  last_place_of_residence_outside_nigeria : value.last_place_of_residence_outside_nigeria,
                  age_last_birthday : value.age_last_birthday,
                  dob : value.dob,
                  name_race_ethnicity_of_father : value.name_race_ethnicity_of_father,
                  fathers_present_occupation : value.fathers_present_occupation,
                  fathers_present_address : value.fathers_present_address,
                  name_race_ethnicity_of_mother : value.name_race_ethnicity_of_mother,
                  process_number: value.process_number,
                  application_code : taxrin(10),
                  org_id : value.org_id,
                  email : value.email,
                  phone : value.phone,
                  current_step: "1"
              }
              let eml = {
                  pd: value.process_number,
                  name: value.applicant_fullname,
                  email:  value.email
                }
              console.log(pyl)
              let prog = new progress({progress: 20, process_number: value.process_number})
              let newApplication = new new_applications(pyl);
              let t = await db.transaction()
              try {

                  await newApplication.save({transaction: t})
                  await prog.save({transaction: t})
                  await t.commit();
                  // await db.query(`UPDATE new_applications SET applicant_fullname = '${req.body.aplname}', dob='${req.body.aplname}'`)
                  emailapplicant(eml);
                  res.status(200).json({msg: "done", data: pyl.process_number})
              } catch (error) {
                await t.rollback();
                console.log(error)
               
                // if(error.parent){
                //      let myswlError = error.parent;
                //      res.status(201).json({err: myswlError.sqlMessage})
                // }
        
                res.status(201).json({err: error.message})
            //   res.send(myswlError.sqlMessage)
                 
              }
          }
      } catch (error) {
          console.log(error);
          res.status(201).json({err: error.message})
      }
    // }
   
}


module.exports.getApplica1_2 = async(req, res) =>{
  let process_id = req.query.piid
  let countries = await _countries.findAll();
  let states = await _states.findAll();
  let lgas = await _lgas.findAll();
  let lgas1 = await _lgas.findAll({where:{state_id: 32}});
  let religs = await religions.findAll();
  let maritals = await marital_status.findAll();
  let genders = await gender.findAll();
  let application = await new_applications.findOne({where: {process_number:process_id}})
  res.render('application_step_1_2', {
    process_id, application, countries, maritals, genders, states, religs,
    lgas, lgas1
  })
}
module.exports.postApplica1_2 = async(req, res) =>{
  console.log(req.body)
 

  try {

    let pg = await progress.findOne({where: {process_number : req.body.proccess_id}})
    let application = await new_applications.findOne({where: {process_number: req.body.proccess_id}})
    await pg.update({progress: 40}, {new:true});
    await application.update(req.body, {new:true});
    res.status(200).json({msg: "done", data: req.body.proccess_id})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}


module.exports.getApplic2_1 = async(req, res) =>{
  let process_id = req.query.piid
  let application = await new_applications.findOne({where: {process_number:process_id}})
  let education = await education_new.findAll({where:{process_number: process_id}});
  let prev_emplyemtnet = await previous_employment.findAll({where:{proccess_number: process_id}});
   let month = await months.findAll()
  res.render('application_step_2_1', {
    process_id, application, education, prev_emplyemtnet, month
  })
}

module.exports.postApplic2_1 = async(req, res) =>{
    // res.send(req.query)
  console.log(req.body)
  try {
    let arr = req.body;
  let school_name1 = [];
  let area1 = [];
  let month1 = [];
  let year1 = [];
  let army_no1 = [];
  let rank_detail1 = [];
  let character_detail1 = [];

  let name_of_prev_employee1 = [];
  let nature_of_prev_employment1 = [];
  let salary_of_prev_employment1 = [];
  let reason_for_leaving1 = [];
  let prvempid = [];
  let eduid = [];

  for (let i = 0; i < arr.length; i++) {
     const name = arr[i].name;
      name == "school_name" ? school_name1.push(arr[i].value) : "";
      name == "area" ? area1.push(arr[i].value) : "";
      name == "month" ? month1.push(arr[i].value) : "";
      name == "year" ? year1.push(arr[i].value) : "";
      name == "army_no" ? army_no1.push(arr[i].value) : "";
      name == "rank_detail" ? rank_detail1.push(arr[i].value) : "";
      name == "character_detail" ? character_detail1.push(arr[i].value) : "";
      name == "name_of_prev_employee" ? name_of_prev_employee1.push(arr[i].value) : "";
      name == "nature_of_prev_employment" ? nature_of_prev_employment1.push(arr[i].value) : "";
      name == "salary_of_prev_employment" ? salary_of_prev_employment1.push (arr[i].value) : "";
      name == "reason_for_leaving" ? reason_for_leaving1.push (arr[i].value) : "";
      name == "prvempid" ? prvempid.push (arr[i].value) : "";
      name == "eduid" ? eduid.push (arr[i].value) : "";
  }

// console.log(school_name1)
  let education = [];
    for (let i = 0; i < school_name1.length; i++) {
     
      let newQ1 = { school_name: school_name1[i], area: area1[i], month: month1[i], year:year1[i],  process_number: req.query.piid};
      if(eduid[i]){
         await education_new.update(newQ1, {where: {id: eduid[i], process_number: req.query.piid}}, {new:true});
      } else {
        education.push(newQ1);
      }
      
        
      
    };
   

    let prev_empl = [];
    for (let i = 0; i < name_of_prev_employee1.length; i++) {
  
     
      let newQ1 = {name_of_prev_employee: name_of_prev_employee1[i], nature_of_prev_employment: nature_of_prev_employment1[i], salary_of_prev_employment: salary_of_prev_employment1[i], reason_for_leaving:reason_for_leaving1[i], proccess_number: req.query.piid };
      

      if(prvempid[i]){
         await previous_employment.update(newQ1, {where:{id: prvempid[i], proccess_number: req.query.piid}});
      } else {
        prev_empl.push(newQ1);
      }
      
    };
   
    let appl = [];

    for (let i = 0; i < rank_detail1.length; i++) {
      let army_no = army_no1[i];
      let rank_detail = rank_detail1[i];
      let character_detail = character_detail1[i];
      let newQ1 = {army_no: army_no, rank_detail: rank_detail, character_detail: character_detail, process_number: req.query.piid, current_step: "2"};
      
      appl.push(newQ1);
    };
    console.log(appl)
    let t = await db.transaction();
    try {
       
        await db.query("UPDATE new_applications set army_no='"+appl[0].army_no+"', rank_detail='"+ appl[0].rank_detail +"', character_detail='"+ appl[0].character_detail +"', current_step='3' WHERE process_number ='"+ req.query.piid+"'",{transaction  : t})

         await education_new.bulkCreate(education, {transaction  : t});
        await previous_employment.bulkCreate(prev_empl, {transaction : t});
       
            await t.commit();
            let pg = await progress.findOne({where: {process_number : req.query.piid}})
            await pg.update({progress: 60}, {new:true});
            res.status(200).json({msg: "done", data: req.query.piid})
       
       
    } catch (error) {
        await t.rollback();
        console.log(error)
        res.status(201).json({err: error.message })
    }
  } catch (error) {
    console.log(error)
    res.status(201).json({err: error.message })
  }

}

module.exports.getApplic2_2 = async(req, res) => {
    let Consents = await consents.findAll({where:{proccess_number: req.query.piid}})
    let application = await new_applications.findOne({where: {process_number:req.query.piid}})
    res.render('application_step_2_2', {
        piid: req.query.piid, Consents, application
      })
}

module.exports.postApplic2_2 = async(req, res) => {
    try {
        // console.log(req.body)
    let arr = req.body;
    let fine_details = [];
    let under_consideration = [];
    let relevant_information = [];
    let name_consents = [];
    let adress_of_consents = [];
    let period = [];
    let objections_to_reference = [];
  
    let why_wish_to_leave_your_present_employement = [];
    let concentid = [];
    
    for (let i = 0; i < arr.length; i++) {
       const name = arr[i].name;
        name == "fine_details" ? fine_details.push(arr[i].value.replace(/['"]+/g, '')) : "";
        name == "under_consideration" ? under_consideration.push(arr[i].value.replace(/['"]+/g, '')) : "";
        name == "relevant_information" ? relevant_information.push(arr[i].value.replace(/['"]+/g, '')) : "";
        name == "name_consents" ? name_consents.push(arr[i].value) : "";
        name == "adress_of_consents" ? adress_of_consents.push(arr[i].value) : "";
        name == "period" ? period.push(arr[i].value) : "";
        name == "objections_to_reference" ? objections_to_reference.push(arr[i].value) : "";
        name == "why_wish_to_leave_your_present_employement" ? why_wish_to_leave_your_present_employement.push(arr[i].value) : "";
        name == "concentid" ? concentid.push(arr[i].value) : "";
    }

    console.log(concentid)

    let applic = []
    for (let i = 0; i < why_wish_to_leave_your_present_employement.length; i++) {
       let newQ1 = {
            fine_details: fine_details[i],
            under_consideration: under_consideration[i],
            relevant_information: relevant_information[i],
            objections_to_reference: objections_to_reference[i],
            why_wish_to_leave_your_present_employement: why_wish_to_leave_your_present_employement[i],
            process_number: req.query.piid
          };
         applic.push(newQ1);
      };
  
      let consets = [];
      console.log("lenght", name_consents.length)
      for (let i = 0; i < name_consents.length; i++) {

        // name_consents = name_consents[i];
        // adress_of_consents = adress_of_consents[i];
        // period = period[i];
        let newarr = []
        let newQ1 = {name_consents: name_consents[i], adress_of_consents: adress_of_consents[i], period: period[i], proccess_number: req.query.piid};
        // console.log(newQ1)

        if(concentid[i] == 0){
          // console.log(newQ1, "new concent")
          // console.log("=========================================================================================================================")
          consets.push(newQ1)
        } else {
          // console.log(newQ1, "Old")
          // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
          // console.log(concentid)
          // db.query(`UPDATE consents SET name_consents = '${name_consents[i]}', adress_of_consents = '${adress_of_consents[i]}', period = '${period[i]}' WHERE id= ${concentid[i]} and proccess_number= '${req.query.piid}'  `, {type: QueryTypes.UPDATE})
          // let consen = await consents.findOne({where:{id: concentid, proccess_number: req.query.piid}});
            consents.update(newQ1, {where:{id:concentid[i]}}, {new:true});
        }
       
      
      
      };

      let t = await db.transaction();
    
      try {
       
        await db.query("UPDATE new_applications set fine_details='"+applic[0].fine_details+"',  under_consideration='"+ applic[0].under_consideration +"', relevant_information='"+ applic[0].relevant_information +"',objections_to_reference='"+ applic[0].objections_to_reference +"' , why_wish_to_leave_your_present_employement='"+ applic[0].why_wish_to_leave_your_present_employement +"', current_step='3' where process_number ='"+ req.query.piid+"'",{transaction  : t}) 
        //  let newappl = await new_applications.findOne({where:{process_number: req.query.piid}});
        //  newappl.update(applic, {new:true}, { transaction: t })
        await consents.bulkCreate(consets, {transaction: t})

        await t.commit();
        res.status(200).json({msg: "done", data:req.query.piid})
      } catch (error) {
        await t.rollback()
        console.log(error)
        res.status(201).json({err: error.message })
      }
    } catch (error) {
        console.log(error)
        res.status(201).json({err: error.message })
    }
    

}


module.exports.uploadFiles = async(req, res) => {
  let piid = req.query.piid
  res.render('upload_doc', {
    piid
  })
}



module.exports.postuploadfiles = async(req, res)=> {
  let docs = req.files;
  if(docs.length > 0){
    let uploads = [];
    docs.forEach((i) => {
        let upload = {
          name: req.query.piid,
          document: req.query.piid,
          url:  i.filename,
        };
    
      let mm = new document(upload);
      mm.save().then(function (result) {
           new_applications.update({current_step:'5'}, {where:{process_number: req.query.piid}}, {new:true});
        res.sendStatus(200)
      })
    })
  }
// console.log(req) 
}


module.exports.getPreview = async (req, res) => {
  try {
    let process_id = req.query.piid;
    let application = await new_applications.findOne({where: { process_number: req.query.piid },});
    let docs = await document.findAll({ where: { name: process_id } });
    let Consents = await consents.findAll({where: { proccess_number: process_id },});
    let education = await education_new.findAll({where: { process_number: process_id },});
    let prev_emplyemtnet = await previous_employment.findAll({where: { proccess_number: process_id },});
    let job_cate = await job_category.findAll();
    let countries = await _countries.findAll();
    let states = await _states.findAll();
    let lgas = await _lgas.findAll();
    let religs = await religions.findAll();
    let maritals = await marital_status.findAll();
    let genders = await gender.findAll();
    let month = await months.findAll()
   
    res.render("preview", {
      application,
      docs,
      Consents,
      education,
      prev_emplyemtnet,
      id: application.applicant_id,
      org: application.org_id,
      job_cate,
      process_id,
      countries,
      maritals,
      genders,
      states,
      religs,
      lgas,
      month
    });
  } catch (error) {}
};


module.exports.update_review = async(req, res) => {
  try {
    console.log(req.body)
    let pyl = {
      applicant_fullname : req.body.applicant_fullname,
      other_names : req.body.other_names,
      job_position : req.body.job_position,
      job_position2 : req.body.job_position,
      date_available_for_employment : req.body.date_available_for_employment,
      highest_education : req.body.highest_education,
      present_employment_detail : req.body.present_employment_detail,
      address_of_correspondence : req.body.address_of_correspondence,
      last_place_of_residence_outside_nigeria : req.body.last_place_of_residence_outside_nigeria,
      age_last_birthday : req.body.age_last_birthday,
      dob : req.body.dob,
      name_race_ethnicity_of_father : req.body.name_race_ethnicity_of_father,
      fathers_present_occupation : req.body.fathers_present_occupation,
      fathers_present_address : req.body.fathers_present_address,
      name_race_ethnicity_of_mother : req.body.name_race_ethnicity_of_mother,
      process_number: req.body.process_number,
      email : req.body.email,
      phone : req.body.phone,
      applicant_town_of_birt : req.body.applicant_town_of_birt,
      applicant_local_govt : req.body.applicant_local_govt,
      applicant_country : req.body.applicant_country,
      passport_no : req.body.passport_no,
      place_state_of_issue : req.body.place_state_of_issue,
      gender : req.body.gender,
      marital_status : req.body.marital_status,
      number_of_dependent_children : req.body.number_of_dependent_children,
      nationality_race_ethnicity_of_applicant : req.body.nationality_race_ethnicity_of_applicant,
      applicant_reliegion : req.body.applicant_reliegion,
      physical_fitness : req.body.physical_fitness,
      details_of_countries_visited : req.body.details_of_countries_visited,
      language : req.body.language,
      state_of_origin: req.body.state_of_origin,
      army_no:   req.body.army_no,
      rank_detail:   req.body.rank_detail,
      character_detail:   req.body.character_detail,
      fine_details:  req.body.fine_details,
      under_consideration:  req.body.under_consideration,
      relevant_information:   req.body.relevant_information,
      objections_to_reference:  req.body.objections_to_reference,
      why_wish_to_leave_your_present_employement : req.body.why_wish_to_leave_your_present_employement
  }
  await new_applications.update(pyl, {where: {process_number: req.body.piid}})
  res.status(200).json({msg: "done"})
  } catch (error) {
    console.log(error)
    res.status(201).json({err: error.message})
    // req.flash('danger', error.message)
    // res.redirect('back')
  }
}

module.exports.getExaminationPass = async(req, res) => {
  console.log(req.query.piid)
  let month = await months.findAll()
  let Seconday = await examination_pass.findAll({where:{category:"primary/Post primary Seconday", process_number: req.query.piid }});
  let Univwersity = await examination_pass.findAll({where:{category:"University Or Higher Education Attendend", process_number: req.query.piid}});
  res.render('application_step_2_1_1.ejs', {
     Seconday,
    Univwersity, month, piid: req.query.piid
  })
}


module.exports.postExaminationPass = async(req, res) => {
  // console.log(req.query.piid)
  try {
   
    let arr = req.body;
    let Examination_pass = [];
    let category = [];
    let grade = [];
    let month = [];
    let year = [];
    let eduid = [];
    for (let i = 0; i < arr.length; i++) {
      const name = arr[i].name;
      name == "Examination_pass" ? Examination_pass.push(arr[i].value) : "";
      name == "category" ? category.push(arr[i].value) : "";
      name == "grade" ? grade.push(arr[i].value) : "";
      name == "month" ? month.push(arr[i].value) : "";
      name == "year" ? year.push(arr[i].value) : "";
      name == "eduid" ? eduid.push(arr[i].value) : "";
    }

    let pulish = [];
    console.log("lenght", Examination_pass.length);
    for (let i = 0; i < Examination_pass.length; i++) {
      let qw = {Examination_pass:Examination_pass[i], category:category[i], grade:grade[i], month:month[i], year:year[i], process_number: req.query.piid }

      if(eduid[0]){
        examination_pass.update(qw, {where:{id:eduid[0]}}, {new:true})
      } else {
        pulish.push(qw)
      }
     
    }

    let t = await db.transaction();
    try {
      new_applications.update(
        { current_step: "10" },
        { where: { process_number: req.query.piid } },
        { new: true },
        { transaction: t }
      );
      await examination_pass.bulkCreate(pulish, { transaction: t });
      await t.commit()
      res.status(200).json({ msq: "done", data: req.query.piid});
    } catch (error) {
      res.status(201).json({ err: error.message });
    }
    
    
  } catch (error) {
    res.status(201).json({ err: error.message });
  }
}


//delete controller

module.exports.deleteConsent = async(req, res) => {
  try {
    await consents.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}
module.exports.deletDocument = async(req, res) => {
  try {
    await document.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}

module.exports.deletePrevEmp = async(req, res) => {
  try {
    await previous_employment.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}

module.exports.deletEduc = async(req, res) => {
  try {
    await education_new.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}



//delete controller

module.exports.deleteConsent = async(req, res) => {
  try {
    await consents.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}

module.exports.deletDocument = async(req, res) => {
  try {
    await document.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}

module.exports.deletePrevEmp = async(req, res) => {
  try {
    await previous_employment.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}

module.exports.deletEduc = async(req, res) => {
  try {
    await education_new.destroy({where:{id: req.query.id}})
    res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}



module.exports.getState = async (req, res) => {
  let country_id = req.query.id;
  _states
    .findAll({ where: { country_id: country_id } })
    .then(function (result) {
      res.send(result);
    });
};
//get lga
// appUsers.get('/api/getlga/:stateID',  (req, res)=>{
module.exports.getLga = async (req, res) => {
  let stateID = parseInt(req.params.stateID);
  _lgas.findAll({ where: { state_id: stateID } }).then(function (result) {
    res.send(result);
  });
};

module.exports.getReturning = async(req, res) => {
  let organizations = await organization.findAll();
  res.render('./auth/returning', {
    organizations
  })
}




module.exports.returniningApplicant = async (req, res) => {
  try {
    let application = await findApplicant(req.body.applicant_ids, req.body.mda_code);
    // console.log(application)
    if(application){
      let step =  application.current_step;
      console.log(step)
      // let label = {}
      if(step == 1){
        res.status(200).json({msq:"Personal Bio data step", processid:application.process_number, uri:'/application?piid='})
      } else if (step == 2) {
        res.status(200).json({msq:"Step one contuation", processid:application.process_number, uri:'/application_1_1?piid='})
      }else if (step == 3) {
        res.status(200).json({msq:"Part B ", processid:application.process_number, uri:'/application_2_1?piid='})
      }else if (step == 4) {
        res.status(200).json({msq:"Part B continuation", processid:application.process_number, uri:'/application_2_2?piid='})
      } else if(step == 10){
          res.status(200).json({msq:"Generat tax id", processid:application.process_number, uri:'/subject_taken_and_grade?piid='})
      } else if (step == 5) { 
        res.status(200).json({msq:"Upload documents", processid:application.process_number, uri:'/upload_documents?piid='})
      }else if (step == 6) {
        res.status(200).json({msq:"Generat tax id", processid:application.process_number, uri:'/Application_feee?piid='})
      }else if (step == 7) {
        res.status(200).json({msq:"Payment Initialized", processid:application.process_number, uri:'/Application_feee?piid='})
      } else if(step == 8){
          res.status(200).json({msq:"Print Application Slip", processid:application.process_number, uri:'/print_application_slips?piid='})
      }
      else {
        res.status(201).json({err:"Please start afresh", uri:'/'})
        
      }
  
    }
  } catch(err) {
    res.status(201).json({err:err.message, uri:'/'})
  }
};


module.exports.applicantFileUp = async(req, res) => {
  try {
    let doc = await document.count({where: {name:req.query.id}})
    console.log(doc)
    res.json(doc)
  } catch (error) {
    res.json(error.message)
  }
}


module.exports.editMDA = async(req, res) => {
  try {
    let applicant = await findApplicanByID(req.query.user_id);
    if(applicant.application_status == 1){
         req.flash('success', 'You can only update once')
         res.redirect('back')
    }
    if (applicant){
      let countries = await _countries.findAll();
      let states = await _states.findAll();
      let lgas = await _lgas.findAll();
      let organiz = await organization.findAll()
        res.render('./edit_basic_info', {
          countries,
          states,
          lgas,
          organiz,
          application : applicant
        })
    }
     
      // applicant.update({org_id: req.query.mda_id}, {new:true})
      // .then(() => {
      //   req.flash('success', 'MDA Updated Successfully')
      //   res.redirect('back')
      // })
  } catch (error) {
    req.flash('danger', error.message)
    res.redirect('back')
  }
}


module.exports.editInfo = async(req, res) => {
  try {

      let upd = {
        applicant_local_govt : req.body.lga_id,
        applicant_country : req.body.country,
        state_of_origin: req.body.state,
        org_id: req.body.org_id,
        applicant_town_of_birt: req.body.applicant_town_of_birt,
        application_status : 1
      }

      console.log(upd)
      await new_applications.update(upd, {where:{process_number: req.body.proccess_id}}, {new:true});
      res.status(200).json({msg: "done"});
      
  } catch (error) {
    res.status(201).json({err: error.message})
  }
}





module.exports.applicantFileUp = async(req, res) => {
  try {
    let doc = await document.count({where: {name:req.query.id}})
    console.log(doc)
    res.json(doc)
  } catch (error) {
    res.json(error.message)
  }
}



async function findApplicanByID(user_inputs) {
  const result = await new_applications.findOne({
    where: {
      [Op.or]: [
        { process_number: user_inputs },
        { phone: user_inputs },
        { email: user_inputs },
      ]
    },
  });

  if (result) {
    return result;
  }
  throw Error("Application with the supplied details not found");
}



async function findApplicant(user_inputs, orgid) {
  const APPLICANTION = await new_applications.findOne({
    where: {
      [Op.or]: [
        { process_number: user_inputs },
        { phone: user_inputs },
        { email: user_inputs },
      ],
      org_id: orgid,
    },
  });

  if (APPLICANTION) {
    return APPLICANTION;
  }
  throw Error("Application with the supplied details not found");
}


async function findApplicant(user_inputs, orgid) {
  const APPLICANTION = await new_applications.findOne({
    where: {
      [Op.or]: [
        { process_number: user_inputs },
        { phone: user_inputs },
        { email: user_inputs },
      ],
      org_id: orgid,
    },
  });

  if (APPLICANTION) {
    return APPLICANTION;
  }
  throw Error("Application with the supplied details not found");
}

async function newfindApplicant(user_inputs, orgid, email) {
  let APPLICANTION = await new_applications.findOne({
    where: {
      [Op.or]: [
        { process_number: user_inputs },
        { phone: user_inputs },
        { email: email },
      ],
      org_id: orgid,
    },
  });

  if (APPLICANTION) {
    return APPLICANTION;
  } 
  return APPLICANTION = "";
}


async function newfindApplication(user_inputs, orgid, email) {
  let APPLICANTION = await new_applications.findOne({
    where: {
      phone: user_inputs,
      email: email,
      org_id: orgid,
    },
  });

  if (APPLICANTION) {
    return APPLICANTION;
  } 
  return APPLICANTION = "";
}



