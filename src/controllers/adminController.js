const { Sequelize, QueryTypes } = require("sequelize");
const db = require("../db/db");
const Op = Sequelize.Op;
const { organization, job, job_category, job_position, new_applications, education_new, previous_employment, consents, examination_pass, document } = require("../model/applicant");
const { individual, companies } = require("../model/assessmentModels");
const { Api_Payments } = require("../model/paymentModel");

module.exports.adminDashboard = async (req, res) => {
  try {
        if (req.user.group_id == 111111) {
            let payment = await Api_Payments.sum('Amount')
            let individualCount = await new_applications.count();
            let completed = await new_applications.count({ where: { current_step: 8 } })
            let applicant = await db.query(`
        SELECT * from new_applications 
        INNER JOIN organization on new_applications.org_id = organization.code
        order by new_applications.id desc  limit 10 
        
        `, { type: QueryTypes.SELECT });
            let ministryap = await db.query(`
        SELECT count(*) as count, organization.name  from new_applications 
        INNER JOIN organization on new_applications.org_id = organization.code where current_step = 8 group by org_id
        `, { type: QueryTypes.SELECT });

            res.render("./admin/dashboard", {
                individualCount,
                applicant: applicant,
                ministryap, payment, completed,
                title: "Dashbord"
            });
        } else {
            let payment = await Api_Payments.sum('Amount')
            let individualCount = await new_applications.count({ where: { org_id: req.user.organiztion_id } });
            let completed = await new_applications.count({ where: { current_step: 8, org_id: req.user.organiztion_id } })
            let applicant = await db.query(`
        SELECT * from new_applications 
        INNER JOIN organization on new_applications.org_id = organization.code WHERE org_id = ${req.user.organiztion_id}
        order by new_applications.id desc  limit 10 
        
        `, { type: QueryTypes.SELECT });
            let ministryap = await db.query(`
        SELECT count(*) as count, organization.name  from new_applications 
        INNER JOIN organization on new_applications.org_id = organization.code WHERE org_id = ${req.user.organiztion_id} group by org_id
        `, { type: QueryTypes.SELECT });

            res.render("./admin/dashboard", {
                individualCount,
                applicant: applicant,
                ministryap, payment, completed,
                title: "Dashbord"
            });
        }

    } catch (err) {
        console.log(err)
    }
};

module.exports.creatMda = async (req, res) => {
  let mdas = await organization.findAll();
  res.render('./admin/mdas', {
    mdas, title : "MDAs"
  });
};
module.exports.postMdA = async (req, res) => {
  try {
    let payload = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
    };

    let newMda = new organization(payload);
   await  newMda.save();
   res.status(200).json({msg: "done"})
  } catch (error) {
    res.status(201).json({err: error.message})
  }
};



module.exports.getJobs = async(req, res) => {
    let jobs = await job.findAll();
    res.status(200).json({data: jobs})
}

module.exports.postJobs = async(req, res) => {
    try {
        let payload = {
            code : req.body.code,
            name : req.body.name,
            description : req.body.description,
            date_published : req.body.date_published,
            job_start_date : req.body.job_start_date,
            no_of_vancncies : req.body.no_of_vancncies,
            job_category_id : req.body.job_category_id,
            job_position_id : req.body.job_position_id,
            job_platform_id : req.body.job_platform_id,
            organiztion_id  : req.body.organiztion_id,
            
        }
        let newJob = new job(payload);
        await newJob.save();
        res.status(200).json({msg: "done"})
    } catch (error) {
        
    }
}

module.exports.getJobCategory = async(req, res) => {
    let job_cate = await job_category.findAll();
    res.render('./admin/job_categories', {
        job_cate, title: "Job Categories"
    })
}

module.exports.postJobCategory = async(req, res) => {
    try {
        let payload = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
        }
        let newCategory = new job_category(payload);
        await newCategory.save();
        res.status(200).json({msg: "done"})
    } catch (error) {
        
    }
}

module.exports.getJobPosition = async(req, res) => {
    let job_pos = await job_position.findAll();
    res.status(200).json({data: job_pos})
}

module.exports.postJobPosition = async(req, res) => {
    try {
        let payload = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
        }
        let newPosi = new job_position(payload);
        await newPosi.save();
        res.status(200).json({msg: "done"})
    } catch (error) {
        
    }
}

module.exports.getJobPlatform = async(req, res) => {
    let job_plat = await job_platform.findAll();
    res.status(200).json({data: job_cate})
}

module.exports.postJobPlatform = async(req, res) => {
    try {
        let payload = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
        }
        let newJobplat = new job_platform(payload);
        await newJobplat.save();
        res.status(200).json({msg: "done"})
    } catch (error) {
        
    }
}


module.exports.getJobPlatform = async(req, res) => {
    let job_plat = await job_platform.findAll();
    res.status(200).json({data: job_cate})
}

module.exports.postJobPlatform = async(req, res) => {
    try {
        let payload = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
        }
        let newJobplat = new job_platform(payload);
        await newJobplat.save();
        res.status(200).json({msg: "done"})
    } catch (error) {
        
    }
}


module.exports.get_applicants = async(req, res) => {

    if (req.user.group_id == 111111) {
        let perPage = 10;
        let page = req.query.page || 1;
        let offset = perPage * page - perPage;
        let orgid = req.query.complect || [1, 2, 3, 4, 5, 6, 7, 10];



        let applicant = await db.query(`
    SELECT new_applications.*, organization.name as name, job_category.name as position from new_applications 
    INNER JOIN organization on new_applications.org_id = organization.code
    LEFT JOIN job_category on job_category.code = new_applications.job_position
    INNER JOIN progress on new_applications.process_number = progress.process_number where current_step IN (${orgid})  order by new_applications.id limit ${perPage} offset ${offset}
    
    `, { type: QueryTypes.SELECT });
        let cnt = await db.query(`SELECT COUNT(*) as count FROM new_applications WHERE  current_step IN (${orgid})`, { type: QueryTypes.SELECT })
        // new_applications.count({ where: { current_step: {[Op.in]: orgid} } })
        // console.log(cnt);
        let count = cnt[0].count;
        console.log(count)
        res.render('./admin/review_applications', {
            applicant, title: "Review Applications",
            current: page,
            pages: Math.ceil(count / perPage),
            count,
            orgid : orgid == 8 ? 8 : 0
        })
    } else {
        let perPage = 10;
        let page = req.query.page || 1;
        let offset = perPage * page - perPage;


        let applicant = await db.query(`
    SELECT new_applications.*, organization.name as name, job_category.name as position from new_applications 
    INNER JOIN organization on new_applications.org_id = organization.code
    LEFT JOIN job_category on job_category.code = new_applications.job_position
    INNER JOIN progress on new_applications.process_number = progress.process_number where org_id = ${req.user.organiztion_id} AND current_step = 8 order by new_applications.id limit ${perPage} offset ${offset}
    
    `, { type: QueryTypes.SELECT });
        let count = await new_applications.count({ where: { current_step: 8 } })

        res.render('./admin/review_applications', {
            applicant, title: "Review Applications",
            current: page,
            pages: Math.ceil(count / perPage),
            count,
            orgid : orgid == 8 ? 8 : 0
        })
    }

}

module.exports.getApplicationD = async(req, res) => {

    let applicant = await db.query(`
         SELECT new_applications.*, organization.name as name, job_category.name as job, _countries.*,  _states.*,  _lga.*  from new_applications 
        INNER JOIN organization on new_applications.org_id = organization.code
        LEFT JOIN job_category on job_category.code = new_applications.job_position
        LEFT JOIN _countries ON _countries.country_id = new_applications.applicant_country
        LEFT JOIN _states ON _states.state_id = new_applications.state_of_origin
        LEFT JOIN _lga ON _lga.lga_id = new_applications.applicant_local_govt
    where new_applications.process_number = '${req.query.process_id}'`, {type: QueryTypes.SELECT});
    let job = await job_category.findOne({where:{code: applicant[0].job_position }})
    let education = await education_new.findAll({where:{process_number: req.query.process_id}});
    let prev_emplyemtnet = await previous_employment.findAll({where:{proccess_number: req.query.process_id}});
    let Consents = await consents .findAll({where:{proccess_number: req.query.process_id}})
    let pass =  await examination_pass.findAll({where: {process_number: req.query.process_id}})
    let docs = await document.findAll({where:{name:  req.query.process_id }})
    res.render('./admin/review_answers', {
        applicant: applicant[0], title : "View Application Details", job, education,
        prev_emplyemtnet, Consents, pass, pass, docs
    })
}