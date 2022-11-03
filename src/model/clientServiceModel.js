const Sequelize = require('sequelize');
const db = require('../datab/db');

exports.client_services = db.define('client_services', {
    idclient_services:{
        type:Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    state_name:{
        type: Sequelize.STRING(45)
    },
    client:{
        type: Sequelize.STRING(200)
    },
    use_autopay:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    use_nibbs:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_gl_modification_request:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_dob_dofe_modification_request:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_gl_date_email_notification:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_enrollment_approval:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_fingerprint:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_picture_module:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_pension_module:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_deduction_remmittance:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_employment_number_generation:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    emails_for_modification_requests:{
        type: Sequelize.STRING(45), 
    },
    spc:{
        type: Sequelize.INTEGER(50),
        allowNull: true
    },
    login_for_enrollment_authorization:{
        type: Sequelize.STRING(45),   
    },
    login_for_manual_activation:{
        type: Sequelize.STRING(45),
        allowNull: true
    },
    fingerprint_server_url:{
        type: Sequelize.STRING(200)
    },
    isw_terminal_id:{
        type: Sequelize.STRING(45)
    },
    isw_source_account:{
        type: Sequelize.STRING(45)
    },
    isw_u:{
        type: Sequelize.STRING(200)
    },
    isw_p:{
        type: Sequelize.STRING(200)
    },
    use_etranzact:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    etranzact_terminal_id:{
        type: Sequelize.STRING(45)
    },
    etranzact_pin:{
        type: Sequelize.STRING(45)
    },
    isw_auth_url:{
        type: Sequelize.STRING(200)
    },
    isw_req_url:{
        type: Sequelize.STRING(200),  
    },
    pension_deduction_factor:{
        type: Sequelize.INTEGER(50),
        decimal: 3, 
        allowNull: true
    },
    automatic_initial_pension_start:{
        type: Sequelize.DATE,   
    },
    automatic_pension_verification_interval:{
        type: Sequelize.INTEGER(11),
    },
    pension_spc:{
        type: Sequelize.INTEGER(50),
        allowNull: true,
        decimal: 2
    },
    spc_beneficiary:{
        type: Sequelize.STRING(100)
    },
    spc_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    spc_beneficiary_account:{
        type: Sequelize.STRING(45)
    },
    spc_beneficiary_sort_code:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary:{
        type: Sequelize.STRING(100)
    },
    pension_spc_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary_account:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary_sort_code:{
        type: Sequelize.STRING(45)
    },
    com_beneficiary:{
        type: Sequelize.STRING(45)  
    },
    com_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    com_account:{
        type: Sequelize.STRING(45),   
    },
    com_sort_code:{
        type: Sequelize.STRING(45),
    },
    com_c:{
        type: Sequelize.INTEGER(50),
        allowNull: true,
        decimal: 2
    },
    pension_com_beneficiary:{
        type: Sequelize.STRING(45)
    },
    pension_com_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    pension_com_account:{
        type: Sequelize.STRING(45)
    },
    pension_com_sort_code:{
        type: Sequelize.STRING(45)
    },
    pension_com_c:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    pension_mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    percentile:{
        type: Sequelize.DECIMAL(50),
        decimal: 4,
        allowNull: true
    },
    switching_charge:{
        type: Sequelize.DECIMAL(50),
        decimal: 4,
        allowNull: true
    },
    gratuity_spc_beneficiary:{
        type: Sequelize.STRING(100)
    },
    gratuity_spc_beneficiary_code:{
        type: Sequelize.STRING(100)
    },
    gratuity_spc_beneficiary_account:{
        type: Sequelize.STRING(100)
    },
    gratuity_spc_beneficiary_sort_code:{
        type: Sequelize.STRING(100)
    },
    gratuity_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 4,
        allowNull: true
    },
    gratuity_mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 4,
        allowNull: true
    },
    isw_terminal_id_pension:{
        type: Sequelize.STRING(50)
    },
    isw_terminal_id_gratuity:{
        type: Sequelize.STRING(50)
    },
    isw_source_account_pension:{
        type: Sequelize.STRING(50)
    },
    isw_source_account_gratuity:{
        type: Sequelize.STRING(50)
    },
    isw_terminal_id_leave_allw:{
        type: Sequelize.STRING(50)
    },
    leave_allw_spc:{
        type: Sequelize.INTEGER(50),
        decimal: 2
    },
    leave_allw_mfb_spc:{
        type: Sequelize.INTEGER(50),
        decimal: 2
    },
    leave_allw_spc_beneficiary:{
        type: Sequelize.STRING(50)
    },
    leave_allw_spc_beneficiary_code:{
        type: Sequelize.STRING(50)
    },
    leave_allw_spc_beneficiary_account:{
        type: Sequelize.STRING(50)
    },
    leave_allw_spc_beneficiary_sort_code:{
        type: Sequelize.STRING(50)
    },
    leave_allw_com_c:{
        type: Sequelize.INTEGER(50),
        decimal: 2
    },
    leave_allw_com_account:{
        type: Sequelize.STRING(50)
    },
    leave_allw_com_code:{
        type: Sequelize.STRING(50)
    },
    leave_allw_com_sort_code:{
        type: Sequelize.STRING(50)
    },
    leave_allw_com_beneficiary:{
        type: Sequelize.STRING(50)
    },
    tw_cbn_code:{
        type: Sequelize.STRING(50)
    },
    tw_ben:{
        type: Sequelize.STRING(50)
    },
    tw_ben_code:{
        type: Sequelize.STRING(50)
    },
    pension_deduction_method:{
        type: Sequelize.TINYINT(1),
        allowNull:true
    },
    pension_formula_factor:{
        type: Sequelize.INTEGER(50),
        decimal: 5,
        allowNull: true
    },
    service_id:{
        type: Sequelize.STRING(45)
        // defaultValue: service_id
    },
    service_count:{
        type: Sequelize.INTEGER(3)
    },
    country_code:{
        type: Sequelize.STRING(45),
        defaultValue: 234
    },
    service_code:{
        type: Sequelize.STRING(5)
    },
    service_authentication_code:{
        type: Sequelize.STRING(100)
    },
    client_address:{
        type: Sequelize.STRING(255)
    },
    client_phone:{
        type: Sequelize.STRING(150)
    },
    client_email:{
        type: Sequelize.STRING(100)
    },
    client_admin:{
        type: Sequelize.STRING(100)
    },
    client_admin_email:{
        type: Sequelize.STRING(45)
    },
    client_admin_pwd:{
        type: Sequelize.TEXT
    },
    client_admin_token:{
        type: Sequelize.STRING(45)
    },
    client_supervisor:{
        type: Sequelize.STRING(100)
    },
    client_supervisor_email:{
        type: Sequelize.STRING(255)
    },
    client_supervisor_pwd:{
        type: Sequelize.TEXT                        
    },
    client_supervisor_token:{
        type: Sequelize.STRING(45)
    },
    isw_web_merchant_code:{
        type: Sequelize.STRING(45)
    },
    isw_merchant_ref:{
        type: Sequelize.STRING(45)
    },
    isw_pos_merchant_code:{
        type: Sequelize.STRING(45)
    },
    isw_pos_merchant_ref:{
        type: Sequelize.STRING(45)
    },
    isw_ip_address:{
        type: Sequelize.STRING(45)
    },
    service_logo_url:{
        type: Sequelize.TEXT
    },
    service_logo:{
        type: Sequelize.BLOB                        
    },
    setup_by:{
        type: Sequelize.STRING(45)                        
    },
    setup_on:{
        type: Sequelize.DATE,
        allowNull: true                       
    },
    authorized_by:{
        type: Sequelize.STRING(45)                        
    },
    authorized_on:{
        type: Sequelize.DATE                     
    },
    default_email_template:{
        type: Sequelize.TEXT                     
    },
    last_disabled_by:{
        type: Sequelize.STRING(55)                     
    },
    last_disabled_on:{
        type: Sequelize.DATE                     
    },
    last_reactivated_by:{
        type: Sequelize.STRING(55)                     
    },
    last_reactivated_on:{
        type: Sequelize.DATE                     
    },
    reason_for_last_disable:{
        type: Sequelize.STRING(255)
    },
    reason_for_last_reactivate:{
        type: Sequelize.STRING(255)
    },
    service_status:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    admin_first_use:{
        type: Sequelize.TINYINT(1)
    },
    supervisor_first_use:{
        type: Sequelize.TINYINT(1)
    },
    client_supervisor_phone:{
        type: Sequelize.STRING(255)
    },
    client_admin_phone:{
        type: Sequelize.STRING(45)
    },
    admin_security_question:{
        type: Sequelize.STRING(255)
    },
    admin_answer:{
        type: Sequelize.TEXT
    },
    supervisor_security_question:{
        type: Sequelize.STRING(255)
    },
    supervisor_answer:{
        type: Sequelize.TEXT
    },
    client_type_id:{
        type: Sequelize.INTEGER(10)
    },
    state:{
        type: Sequelize.STRING(255)
    },
    country:{
        type: Sequelize.STRING(255)
    },
    city:{
        type: Sequelize.STRING(255)
    },
    lga:{
        type: Sequelize.STRING(255)
    },
    lga_id:{
        type: Sequelize.INTEGER(11)
    },
    admin_firstname:{
        type:Sequelize.STRING(50)
    },
    admin_middlename:{
        type:Sequelize.STRING(50)
    },
    admin_surname:{
        type:Sequelize.STRING(50)
    },
    supervisor_firstname:{
        type:Sequelize.STRING(50)
    },
    supervisor_middlename:{
        type:Sequelize.STRING(50)
    },
    supervisor_surname:{
        type:Sequelize.STRING(50)
    },
    updated_at:{
        type:Sequelize.DATE
    },
    updated_by:{
        type:Sequelize.STRING(120)
    },
    created_by:{
        type:Sequelize.STRING(55)
    },
    updated_at:{
        type:Sequelize.DATE
    },
    service_type_id:{
        type:Sequelize.INTEGER(11)
    },
    apply_checkin_deduction:{
        type:Sequelize.TINYINT(1),
        allowNull: true
    },
    salary_payment_type_id:{
        type:Sequelize.INTEGER(11)
    },
    client_size_id:{
        type:Sequelize.INTEGER(11)
    },
    deduction_checkin:{
        type:Sequelize.INTEGER(50),
        allowNull: true
    },
    retirement_max_age:{
        type:Sequelize.INTEGER(255),
        allowNull: true
    },
    retirement_max_worklenght:{
        type:Sequelize.INTEGER(255),
        allowNull: true
    },
    enable_retirement:{
        type:Sequelize.TINYINT(1),
        allowNull: true
    },
    deduction_abscenteen_checkin:{
        type:Sequelize.INTEGER(50),
        allowNull: true
    },
    enable_govt_process_charge:{
        type:Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_staff_process_charge:{
        type:Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_staff_process_charge:{
        type:Sequelize.TINYINT(1),
        allowNull: true
    },
    staff_process_charge:{
        type:Sequelize.INTEGER(50),
        decimal: 2,
        allowNull: true
    },
    total_govt_process_charge:{
        type:Sequelize.INTEGER(50),
        decimal: 2,
        allowNull: true
    },
    
},{
    timestamps: false,
    freezeTableName: true,

});

exports.client_services_buffers = db.define('client_services_buffers', {
    idclient_services_buffer:{
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    state_name:{
        type: Sequelize.STRING(45)
    },
    client_type_id:{
        type: Sequelize.INTEGER(45)
    },
    client:{
        type: Sequelize.STRING(200)
    },
    use_autopay:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    use_autopay:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    use_nibbs:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    use_autopay:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_gl_modification_request:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_gl_date_email_notification:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_enrollment_approval:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_fingerprint:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_picture_module:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_pension_module:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_deduction_remmittance:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    enable_employment_number_generation:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    emails_for_modification_requests:{
        type: Sequelize.STRING
    },
    login_for_enrollment_authorization:{
        type: Sequelize.STRING(45)
    },
    spc:{
        type: Sequelize.INTEGER(50),
        allowNull: true
    },
    login_for_manual_activation:{
        type: Sequelize.STRING(45)
    },
    fingerprint_server_url:{
        type: Sequelize.STRING(200)
    },
    isw_terminal_id:{
        type: Sequelize.STRING(45)
    },
    isw_source_account:{
        type: Sequelize.STRING(45)
    },
    isw_u:{
        type: Sequelize.STRING(200)
    },
    isw_p:{
        type: Sequelize.STRING(200)
    },
    use_etranzact:{
        type: Sequelize.TINYINT(1)
    },
    login_for_enrollment_authorization:{
        type: Sequelize.STRING(45),
        allowNull: true
    },
    etranzact_terminal_id:{
        type: Sequelize.STRING(45)
    },
    etranzact_pin:{
        type: Sequelize.STRING(45)
    },
    isw_auth_url:{
        type: Sequelize.STRING(200)
    },
    isw_req_url:{
        type: Sequelize.STRING(200)
    },
    pension_deduction_factor:{
        type: Sequelize.INTEGER(50),
        decimal: 3,
        allowNull:true
    },
    automatic_initial_pension_start:{
        type: Sequelize.DATE
    },
    automatic_pension_verification_interval:{
        type: Sequelize.INTEGER(11)
    },
    pension_spc:{
        type: Sequelize.FLOAT(50),
        DECIMAl: 2,
        allowNull: true
    },
    spc_beneficiary:{
        type: Sequelize.STRING(100)
    },
    spc_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    spc_beneficiary_account:{
        type: Sequelize.STRING(45)
    },
    spc_beneficiary_sort_code:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary_account:{
        type: Sequelize.STRING(45)
    },
    pension_spc_beneficiary_sort_code:{
        type: Sequelize.STRING(45)
    },
    com_beneficiary:{
        type: Sequelize.STRING(45)
    },
    com_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    com_account:{
        type: Sequelize.STRING(45)
    },
    com_sort_code:{
        type: Sequelize.STRING(45)
    },
    com_c:{
        type: Sequelize.FLOAT(50),
        decimal: 2,
        allowNull: true
    },
    pension_com_beneficiary:{
        type: Sequelize.STRING(45)
    },
    pension_com_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    pension_com_account:{
        type: Sequelize.STRING(45)
    },
    pension_com_sort_code:{
        type: Sequelize.STRING(45)
    },
    pension_com_c:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    pension_mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    percentile:{
        type: Sequelize.DECIMAL(50),
        decimal: 4,
        allowNull: true
    },
    switching_charge:{
        type: Sequelize.DECIMAL(50),
        decimal: 4,
        allowNull: true
    },
    gratuity_spc_beneficiary:{
        type: Sequelize.STRING(45)
    },
    gratuity_spc_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    gratuity_spc_beneficiary_account:{
        type: Sequelize.STRING(45)
    },
    gratuity_spc_beneficiary_sort_code:{
        type: Sequelize.STRING(45)
    },
    gratuity_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    gratuity_mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2,
        allowNull: true
    },
    isw_terminal_id_pension:{
        type: Sequelize.STRING(45)
    },
    isw_terminal_id_gratuity:{
        type: Sequelize.STRING(45)
    },
    isw_source_account_pension:{
        type: Sequelize.STRING(45)
    },
    isw_source_account_gratuity:{
        type: Sequelize.STRING(45)
    },
    isw_terminal_id_leave_allw:{
        type: Sequelize.STRING(45)
    },
    isw_source_account_leave_allw:{
        type: Sequelize.STRING(45)
    },
    leave_allw_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2 
    },
    leave_allw_mfb_spc:{
        type: Sequelize.DECIMAL(50),
        decimal: 2 
    },
    leave_allw_spc_beneficiary:{
        type: Sequelize.STRING(45)
    },
    leave_allw_spc_beneficiary_code:{
        type: Sequelize.STRING(45)
    },
    leave_allw_spc_beneficiary_account:{
        type: Sequelize.STRING(45)
    },
    leave_allw_spc_beneficiary_sort_code:{
        type: Sequelize.STRING(45)
    },
    leave_allw_com_c:{
        type: Sequelize.DECIMAL(50),
        decimal: 2 
    },
    leave_allw_com_account:{
        type: Sequelize.STRING(45)
    },
    leave_allw_com_code:{
        type: Sequelize.STRING(45)
    },
    leave_allw_com_sort_code:{
        type: Sequelize.STRING(45)
    },
    leave_allw_com_beneficiary:{
        type: Sequelize.STRING(45)
    },
    tw_account:{
        type: Sequelize.STRING(45)
    },
    tw_cbn_code:{
        type: Sequelize.STRING(45)
    },
    tw_ben:{
        type: Sequelize.STRING(45)
    },
    tw_ben_code:{
        type: Sequelize.STRING(45)
    },
    pension_deduction_method:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    pension_formula_factor:{
        type: Sequelize.DECIMAL(50),
        decimal: 5,
        allowNull: true
    },
    service_id:{
        type: Sequelize.STRING(45)
    },
    service_count:{
        type: Sequelize.INTEGER(3)
    },
    country_code:{
        type: Sequelize.STRING(45),
        allowNull: true
    },
    service_code:{
        type: Sequelize.STRING(5)
    },
    service_authentication_code:{
        type: Sequelize.STRING(100)
    },
    client_address:{
        type: Sequelize.STRING(255)
    },
    country_id:{
        type: Sequelize.INTEGER(11)
    },
    state_id:{
        type: Sequelize.INTEGER(11)
    },
    city_id:{
        type: Sequelize.INTEGER(11)
    },
    client_phone:{
        type: Sequelize.STRING(45)
    },
    client_email:{
        type: Sequelize.STRING(45)
    },
    client_contact_person:{
        type: Sequelize.STRING(100)
    },
    client_admin:{
        type: Sequelize.STRING(200)
    },
    admin_firstname:{
        type: Sequelize.STRING(50)
    },
    admin_middlename:{
        type: Sequelize.STRING(50)
    },
    admin_surname:{
        type: Sequelize.STRING(50)
    },
    client_admin_email:{
        type: Sequelize.STRING(45)
    },
    client_admin_token:{
        type: Sequelize.STRING(45)
    },
    client_supervisor:{
        type: Sequelize.STRING(200)
    },
    client_supervisor_email:{
        type: Sequelize.STRING(255)
    },
    client_supervisor_token:{
        type: Sequelize.STRING(45)
    },
    isw_web_merchant_code:{
        type: Sequelize.STRING(45)
    },
    isw_merchant_ref:{
        type: Sequelize.STRING(45)
    },
    isw_pos_merchant_code:{
        type: Sequelize.STRING(45)
    },
    isw_pos_merchant_ref:{
        type: Sequelize.STRING(45)
    },
    isw_ip_address:{
        type: Sequelize.STRING(45)
    },
    service_logo_url:{
        type: Sequelize.STRING
    },
    service_logo:{
        type: Sequelize.BLOB
    },
    setup_by:{
        type: Sequelize.STRING(45)
    },
    setup_on:{
        type: Sequelize.DATE,
        allowNull: true
    },
    authorized:{
        type: Sequelize.TINYINT(1),
        allowNull: true
    },
    authorized_by:{
        type: Sequelize.STRING(45)
    },
    authorized_on:{
        type: Sequelize.DATE
    },
    default_email_template:{
        type: Sequelize.STRING
    },
    client_supervisor_phone:{
        type: Sequelize.STRING(255)
    },
    client_admin_phone:{
        type: Sequelize.STRING(45)
    },
    state:{
        type: Sequelize.STRING(255)
    },
    country:{
        type: Sequelize.STRING(255)
    },
    city:{
        type: Sequelize.STRING(255)
    },
    lga:{
        type: Sequelize.STRING(255)
    },
    lga_id:{
        type: Sequelize.INTEGER(11)
    },
    supervisor_firstname:{
        type: Sequelize.STRING(50)
    },
    supervisor_middlename:{
        type: Sequelize.STRING(50)
    },
    supervisor_surname:{
        type: Sequelize.STRING(50)
    },
    updated_at:{
        type: Sequelize.DATE
    },
    updated_by:{
        type: Sequelize.STRING(100)
    },
    created_by:{
        type: Sequelize.STRING(55)
    },
    created_at:{
        type: Sequelize.DATE
    },
    service_type_id:{
        type: Sequelize.INTEGER(11)
    },
    client_size_id:{
        type: Sequelize.INTEGER(11)
    },
    email_verified:{
        type: Sequelize.TINYINT(1)
    }
},{
    timestamps: false,
    freezeTableName: true
});
