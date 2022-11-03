const Sequelize = require("sequelize");
const db = require("../db/db");

const new_applications = db.define('new_applications',{
  id: {
    type: Sequelize.INTEGER(20),
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  applicant_fullname: { type: Sequelize.STRING },
  other_names: { type: Sequelize.STRING },
  job_position: { type: Sequelize.STRING },
  job_position2: { type: Sequelize.STRING },
  date_available_for_employment: { type: Sequelize.STRING },
  highest_education: { type: Sequelize.STRING },
  present_employment_detail: { type: Sequelize.STRING },
  address_of_correspondence: { type: Sequelize.STRING },
  last_place_of_residence_outside_nigeria: { type: Sequelize.STRING },
  age_last_birthday: { type: Sequelize.STRING },
  dob: { type: Sequelize.DATE },
  name_race_ethnicity_of_father: { type: Sequelize.STRING },
  fathers_present_occupation: { type: Sequelize.STRING },
  fathers_present_address: { type: Sequelize.STRING },
  name_race_ethnicity_of_mother: { type: Sequelize.STRING },
  place_state_of_issue: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  marital_status: { type: Sequelize.STRING },
  number_of_dependent_children: { type: Sequelize.STRING },
  nationality_race_ethnicity_of_applicant: { type: Sequelize.STRING },
  applicant_reliegion: { type: Sequelize.STRING },
  physical_fitness: { type: Sequelize.STRING },
  details_of_countries_visited: { type: Sequelize.STRING },
  applicant_town_of_birt: { type: Sequelize.STRING },
  applicant_local_govt: { type: Sequelize.STRING },
  applicant_country: { type: Sequelize.STRING },
  language: { type: Sequelize.STRING },
  army_no: { type: Sequelize.STRING },
  rank_detail: { type: Sequelize.STRING },
  character_detail: { type: Sequelize.STRING },
  fine_details: { type: Sequelize.STRING },
  under_consideration: { type: Sequelize.STRING },
  relevant_information: { type: Sequelize.STRING },
  objections_to_reference: { type: Sequelize.STRING },
  why_wish_to_leave_your_present_employement: { type: Sequelize.STRING },
  accepts_terms: { type: Sequelize.STRING },
  date_accepts_terms_and_condition: { type: Sequelize.STRING },
  witness_accepts_term: { type: Sequelize.STRING },

  witness_name: { type: Sequelize.STRING },
  witness_accept_on: { type: Sequelize.STRING },
  process_number: { type: Sequelize.STRING },
  application_code: { type: Sequelize.STRING },
  org_id: { type: Sequelize.INTEGER },
  applicant_id : { type: Sequelize.INTEGER },
  tin: { type: Sequelize.STRING },
  state_of_origin: {type: Sequelize.STRING},
  phone: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING},
  application_date: {type: Sequelize.DATE},
  application_status: {type: Sequelize.TINYINT(1)},
  payment: {type: Sequelize.TINYINT(1)},
  employed: {type: Sequelize.TINYINT(1)},
  current_step: {type: Sequelize.INTEGER(11)}
},
{
  freezeTableName: true,
  timestamps: false,
})

const progress = db.define('progress', {
  id: {
    type: Sequelize.INTEGER(20),
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  progress: { type: Sequelize.STRING },
  process_number: { type: Sequelize.STRING },
},
{
  freezeTableName: true,
  timestamps: false,
})


const consents = db.define('consents', {
  id: {
    type: Sequelize.INTEGER(20),
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name_consents: { type: Sequelize.STRING },
  adress_of_consents: { type: Sequelize.STRING },
  period: { type: Sequelize.STRING },
  proccess_number: { type: Sequelize.STRING }
},
{
  freezeTableName: true,
  timestamps: false,
}
);


const education_new = db.define('education_new', {
  id: {
    type: Sequelize.INTEGER(20),
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  school_name: { type: Sequelize.STRING },
  area: { type: Sequelize.STRING },
  month: { type: Sequelize.STRING },
  year: { type: Sequelize.STRING },
  process_number: { type: Sequelize.STRING }
},
{
  freezeTableName: true,
  timestamps: false,
}
);

const previous_employment = db.define('previous_employment', {
  id: {
    type: Sequelize.INTEGER(20),
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name_of_prev_employee: { type: Sequelize.STRING },
  nature_of_prev_employment: { type: Sequelize.STRING },
  salary_of_prev_employment: { type: Sequelize.DECIMAL(50, 2) },
  reason_for_leaving: { type: Sequelize.STRING },
  // previous_employmentcol: { type: Sequelize.STRING },
  proccess_number: { type: Sequelize.STRING }
},
{
  freezeTableName: true,
  timestamps: false,
}
);
const  answer = db.define(
    "answer",
    {
      id: {
        type: Sequelize.INTEGER(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      application_test_id: { type: Sequelize.STRING },
      recruiter_id: { type: Sequelize.DATE },
      total_grades: { type: Sequelize.STRING },
      pass: { type: Sequelize.STRING },
      answer_details: { type: Sequelize.STRING },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

const  applicant = db.define(
  "applicant",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    sumarry: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  application = db.define(
  "application",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    date_of_application: { type: Sequelize.DATE },
    education: { type: Sequelize.DATE },
    experience: { type: Sequelize.STRING },
    other_id: { type: Sequelize.STRING },
    applicant_id: { type: Sequelize.STRING },
    job_id: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  application_evaluation = db.define(
  "application_evaluation",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    note: { type: Sequelize.STRING },
    recruiter_id: { type: Sequelize.DATE },
    application_id: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    hiredid: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  application_status = db.define(
  "application_status",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    status: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  application_status_change = db.define(
  "application_status_change",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    date_changed: { type: Sequelize.STRING },
    application_status_id: { type: Sequelize.DATE },
    application_id: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  application_text = db.define(
  "application_text",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    test_id: { type: Sequelize.STRING },
    application_id: { type: Sequelize.DATE },
    start_time: { type: Sequelize.STRING },
    end_time: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const document = db.define(
  "document",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: Sequelize.STRING },
    document: { type: Sequelize.DATE },
    url: { type: Sequelize.STRING },
    last_update: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const interview_note = db.define(
  "interview_note",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    notes: { type: Sequelize.STRING },
    interview_id: { type: Sequelize.DATE },
    recruiter_id: { type: Sequelize.STRING },
    pass: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  job = db.define(
  "job",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    code: { type: Sequelize.STRING },
    name: { type: Sequelize.DATE },
    description: { type: Sequelize.STRING },
    date_published: { type: Sequelize.STRING },
    job_start_date: { type: Sequelize.DATE },
    no_of_vancncies: { type: Sequelize.STRING },
    job_category_id: { type: Sequelize.STRING },
    job_position_id: { type: Sequelize.DATE },
    job_platform_id: { type: Sequelize.STRING },
    organiztion_id: { type: Sequelize.STRING },
    process_id: { type: Sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  job_category = db.define(
  "job_category",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    code: { type: Sequelize.STRING },
    name: { type: Sequelize.DATE },
    description: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  job_platform = db.define(
  "job_platform",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    code: { type: Sequelize.STRING },
    name: { type: Sequelize.DATE },
    description: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  job_position = db.define(
  "job_position",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    code: { type: Sequelize.STRING },
    name: { type: Sequelize.DATE },
    description: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  organization = db.define(
  "organization",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    code: { type: Sequelize.STRING },
    name: { type: Sequelize.DATE },
    description: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  process = db.define(
  "process",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    code: { type: Sequelize.STRING },
    description: { type: Sequelize.DATE },
    recruiter_id: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const  process_step = db.define(
  "process_step",
  {
    id: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    step_id: { type: Sequelize.STRING },
    process_id: { type: Sequelize.DATE },
    status: { type: Sequelize.STRING },
    priority: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


const  recruiter = db.define(
    "recruiter",
    {
      id: {
        type: Sequelize.INTEGER(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: { type: Sequelize.STRING },
      last_name: { type: Sequelize.DATE }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  
const  steps = db.define(
    "steps",
    {
      id: {
        type: Sequelize.INTEGER(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      code: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  const  test = db.define(
    "test",
    {
        code: {
        type: Sequelize.INTEGER(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      duration: { type: Sequelize.STRING },
      max_score: { type: Sequelize.STRING }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  
const _lgas = db.define(
  "_lga",
  {
    lga_id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    lga: {
      type: Sequelize.STRING(50),
    },
    lga_code: {
      type: Sequelize.STRING,
    },
    state_id: {
      type: Sequelize.BIGINT(20),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const _countries = db.define(
  "_countries",
  {
    country_id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    country: {
      type: Sequelize.STRING(45),
    },
    country_code: {
      type: Sequelize.STRING(45),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const _states = db.define(
  "_states",
  {
    state_id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    state: {
      type: Sequelize.STRING(45),
    },
    state_code: {
      type: Sequelize.STRING(45),
    },
    country_id: {
      type: Sequelize.INTEGER(20),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


const marital_status = db.define('marital_status', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  marital_status: {
    type: Sequelize.STRING(45),
  },
},  {
  timestamps: false,
  freezeTableName: true,
})

const gender = db.define('gender', {
  id: {
  type: Sequelize.BIGINT(20),
  primaryKey: true,
  autoIncrement: true,
  allowNull: true,
},
gender: {
  type: Sequelize.STRING(45),
}
},  {
timestamps: false,
freezeTableName: true,
})


const religions = db.define('religions', {
  id: {
  type: Sequelize.BIGINT(20),
  primaryKey: true,
  autoIncrement: true,
  allowNull: true,
},
religion: {
  type: Sequelize.STRING(45),
}
},  {
timestamps: false,
freezeTableName: true,
})



const months = db.define('months', {
  id: {
  type: Sequelize.BIGINT(20),
  primaryKey: true,
  autoIncrement: true,
  allowNull: true,
},
month: {
  type: Sequelize.STRING(45),
}
},  {
timestamps: false,
freezeTableName: true,
})


const examination_pass = db.define('examination_pass', {
  id: {
  type: Sequelize.BIGINT(20),
  primaryKey: true,
  autoIncrement: true,
  allowNull: true,
},
Examination_pass: {
  type: Sequelize.STRING(200),
},
grade: {
  type: Sequelize.STRING(45),
},
month: {
  type: Sequelize.STRING(45),
},
year: {
  type: Sequelize.STRING(45),
},
process_number: {
  type: Sequelize.STRING(45),
},
category : {
  type: Sequelize.STRING(100),
}
},  {
timestamps: false,
freezeTableName: true,
})




module.exports = {
  new_applications,
  progress,
  consents,
  education_new,
  previous_employment,
  applicant,
  document,
  job_category,
  organization,
  _lgas,
  _countries,
  _states,
  marital_status,
  gender, 
  religions, months,
  examination_pass
};
