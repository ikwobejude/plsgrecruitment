const Sequelize = require('sequelize');
const db = require('../db/db');

const assessments = db.define('assessments', {
    assessment_id:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    assessment_ref:{ type: Sequelize.STRING(50)},
    assessment_date:{ type: Sequelize.DATE},
    tax_payer_type:{ type: Sequelize.STRING},
    tax_payer_rin:{ type: Sequelize.STRING},
    tax_payer_name:{ type: Sequelize.STRING},
    asset_type:{ type: Sequelize.STRING},
    asset_rin:{ type: Sequelize.STRING},
    profile_ref:{ type: Sequelize.STRING},
    assessment_rule:{ type: Sequelize.STRING},
    tax_year:{ type: Sequelize.INTEGER},
    assessment_amount:{ type: Sequelize.DECIMAL(50, 2)},
    assessment_amount_paid:{ type: Sequelize.DECIMAL(50, 2)},
    assessment_amount_paid:{ type: Sequelize.DECIMAL(50, 2)},
    settlement_due_date:{ type: Sequelize.DATE},
    settlement_status:{ type: Sequelize.TINYINT(1)},
    settlement_date:{ type: Sequelize.DATE},
    settlement_method:{ type: Sequelize.STRING},
    service_id:{ type: Sequelize.STRING},
    created_by:{ type: Sequelize.STRING},
    created_at:{ type: Sequelize.DATE},
    updated_by:{ type: Sequelize.STRING},
    updated_at:{ type: Sequelize.DATE},
    first_reminder_date:{ type: Sequelize.DATE},
    second_reminder_date:{ type: Sequelize.DATE},
    third_reminder_date:{ type: Sequelize.DATE},
    fourth_reminder_date:{ type: Sequelize.DATE},
    date_move_defaulter:{ type: Sequelize.DATE},
    batch_number:{ type: Sequelize.STRING},
    source:{ type: Sequelize.STRING},
    tax_month:{ type: Sequelize.STRING},
    waiver_amount:{ type: Sequelize.DECIMAL},
    wavier_date:{ type: Sequelize.DATE},
    wavier_status:{ type: Sequelize.TINYINT},
    assessment_item:{ type: Sequelize.STRING},
    assessment_note:{ type: Sequelize.STRING},
    invoice_number:{ type: Sequelize.STRING},
    tax_office_id:{ type: Sequelize.INTEGER},
},{
    freezeTableName: true,
    timestamps: false
});

const assessment_item_invoices = db.define('assessment_item_invoices', {
    id_assessment_item_invoices:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    ref_no:{ type: Sequelize.STRING},
    taxpayer_rin:{ type: Sequelize.STRING},
    assessment_item_id:{ type: Sequelize.BIGINT(20)},
    description:{ type: Sequelize.STRING},
    amount:{ type: Sequelize.DECIMAL(50)},
    date_log:{ type: Sequelize.DATE},
    invoice_number:{ type: Sequelize.STRING},
    asset_rin:{ type: Sequelize.STRING},
    locked:{ type: Sequelize.TINYINT(1)},
    paid:{ type: Sequelize.TINYINT(1)},
    service_id:{ type: Sequelize.STRING},
    created_by:{ type: Sequelize.STRING},
    created_at:{ type: Sequelize.DATE},
    expiration_length_days:{ type: Sequelize.INTEGER(11)},
    expiration_date:{ type: Sequelize.DATE},
    tax_office_id:{ type: Sequelize.INTEGER(11)},
    assessment_ref:{ type: Sequelize.STRING},
    street_id:{ type: Sequelize.INTEGER(11)},
    profile_ref:{ type: Sequelize.STRING},
    item_category:{ type: Sequelize.STRING},
    revenue_stream:{ type: Sequelize.STRING},
    tax_month:{ type: Sequelize.STRING},
    tax_year:{ type: Sequelize.STRING},
    print:{ type: Sequelize.TINYINT},
    
},{
    freezeTableName: true,
    timestamps: false
})


const assessment_items = db.define('assessment_items', {
    assessment_item_id:{ type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true},
    item_ref    :{ type: Sequelize.STRING},
    asset_type:{ type: Sequelize.STRING},
    assessment_group:{ type: Sequelize.STRING},
    assessment_sub_group:{ type: Sequelize.STRING},
    revenue_stream:{ type: Sequelize.STRING},
    revenue_sub_stream:{ type: Sequelize.STRING},
    item_category:{ type: Sequelize.STRING},
    item_sub_category:{ type: Sequelize.STRING},
    revenue_agency:{ type: Sequelize.STRING},
    assessment_item_name:{ type: Sequelize.STRING},
    computation:{ type: Sequelize.ENUM("FIXED", "VARIABLE")},
    tax_base_amount:{ type: Sequelize.DECIMAL(50, 2)},
    percentage:{ type: Sequelize.DECIMAL(50, 2)},
    tax_amount:{ type: Sequelize.DECIMAL(50, 2)},
    early_amount:{ type: Sequelize.DECIMAL(50, 2)},
    late_amount:{ type: Sequelize.DECIMAL(50, 2)},
    service_id:{ type: Sequelize.STRING},
    created_by:{ type: Sequelize.STRING},
    created_at:{ type: Sequelize.DATE},
    updated_by:{ type: Sequelize.STRING},
    updated_at:{ type: Sequelize.DATE},
    expiry:{ type: Sequelize.TINYINT},
    expiration_length_days:{ type: Sequelize.STRING},
    organization_id:{ type: Sequelize.STRING},
    assignable:{ type: Sequelize.TINYINT},
    profile_ref:{ type: Sequelize.STRING},
    frequency:{ type: Sequelize.STRING},
    new_reg:{ type: Sequelize.TINYINT(1)},
    renewal:{ type: Sequelize.TINYINT(1)},
    coo:{ type: Sequelize.TINYINT(1)},
    no_vin:{ type: Sequelize.TINYINT(1)},
    others:{ type: Sequelize.TINYINT(1)},
    vehicle_type_id:{ type: Sequelize.INTEGER(11)},
    vehicle_ownership_id:{ type: Sequelize.INTEGER(11)},
    vehicle_function_id:{ type: Sequelize.INTEGER(11)},
    vehicle_purpose_id:{ type: Sequelize.INTEGER(11)},
    vehicle_capacity_id:{ type: Sequelize.INTEGER(11)},
    vehicle_weight_id:{ type: Sequelize.INTEGER(11)},
    vehicle_cost_id:{ type: Sequelize.INTEGER(11)},
    dependency:{ type: Sequelize.STRING},
},{
    freezeTableName: true,
    timestamps: false
})


const tax_offices = db.define('tax_offices', {
    id_tax_office:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    tax_office_id:{ type: Sequelize.STRING},
    tax_office:{ type: Sequelize.STRING},
    service_id:{ type: Sequelize.STRING},
    created_by:{ type: Sequelize.STRING},
    created_at:{ type: Sequelize.DATE},
    updated_by:{ type: Sequelize.STRING},
    updated_at:{ type: Sequelize.DATE},
    organization_id:{ type: Sequelize.STRING},
},{
    freezeTableName: true,
    timestamps: false
})

const individual = db.define('individual', {
    id_individual:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    ind_no:{ type: Sequelize.STRING},
    individual_id:{ type: Sequelize.INTEGER(11)},
    user_rin:{ type: Sequelize.STRING},
    individual_name:{ type: Sequelize.STRING},
    lastname:{ type: Sequelize.STRING},
    middlename:{ type: Sequelize.STRING},
    firstname:{ type: Sequelize.STRING},
    individual_tin:{ type: Sequelize.STRING},
    mobile_number_1:{ type: Sequelize.STRING},
    email_addresss_1:{ type: Sequelize.STRING},
    economic_activity:{ type: Sequelize.STRING},
    preferred_notification_method:{ type: Sequelize.STRING},
    tax_payer_status:{ type: Sequelize.STRING},
    account_balance:{ type: Sequelize.DECIMAL(50, 2)},
    gender:{ type: Sequelize.STRING},
    dob:{ type: Sequelize.DATE},
    mobile_number_2:{ type: Sequelize.STRING},
    email_addresss_2:{ type: Sequelize.STRING},
    title:{ type: Sequelize.STRING},
    nationality:{ type: Sequelize.STRING},
    marital_status:{ type: Sequelize.STRING},
    biometric_detail:{ type: Sequelize.STRING},
    service_id:{ type: Sequelize.STRING},
    created_by:{ type: Sequelize.STRING},
    created_at:{ type: Sequelize.DATE},
    updated_by:{ type: Sequelize.STRING},
    updated_at:{ type: Sequelize.DATE},
    contactaddress:{ type: Sequelize.STRING},
    photo_url:{ type: Sequelize.STRING},
    city_id:{ type: Sequelize.INTEGER(11)},
    lga_id:{ type: Sequelize.INTEGER(11)},
    state_id:{ type: Sequelize.INTEGER(11)},
    country_id:{ type: Sequelize.INTEGER(11)},
    residential_statues:{ type: Sequelize.STRING},
    id_card_type:{ type: Sequelize.STRING},
    id_card_no:{ type: Sequelize.STRING},
    id_card_expiry_date:{ type: Sequelize.STRING},
    employment_number:{ type: Sequelize.STRING},
    reference_no:{ type: Sequelize.STRING},
    organization_id:{ type: Sequelize.INTEGER(11)},
    resident_street_id:{ type: Sequelize.INTEGER(11)},
    resident_ward_id:{ type: Sequelize.INTEGER(11)},
    bvn:{ type: Sequelize.STRING},
    nin:{ type: Sequelize.STRING},
},{
    freezeTableName: true,
    timestamps: false
})


const companies = db.define('companies', {
    id_company : {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    company_id:{ type: Sequelize.STRING},
    company_rin:{ type: Sequelize.STRING},
    company_name:{ type: Sequelize.STRING},
    company_tin:{ type: Sequelize.STRING},
    mobile_number:{ type: Sequelize.STRING},
    email_addresss:{ type: Sequelize.STRING},
    tax_office:{ type: Sequelize.STRING},
    tax_payer_type:{ type: Sequelize.STRING},
    economic_activity:{ type: Sequelize.STRING},
    preferred_notification_method:{ type: Sequelize.STRING},
    tax_payer_status:{ type: Sequelize.STRING},
    account_balance:{ type: Sequelize.DECIMAL(50)},
    service_id:{ type: Sequelize.STRING},
    created_by:{ type: Sequelize.STRING},
    created_at:{ type: Sequelize.DATE},
    updated_at:{ type: Sequelize.DATE},
    system_company_rin:{ type: Sequelize.STRING},
    mobile_number2:{ type: Sequelize.STRING},
    email_addresss2:{ type: Sequelize.STRING},
    contactaddress:{ type: Sequelize.STRING},
    rcc_number:{ type: Sequelize.STRING},
    city_id:{ type: Sequelize.INTEGER},
    state_id:{ type: Sequelize.INTEGER},
    lga_id:{ type: Sequelize.INTEGER},
    country_id:{ type: Sequelize.INTEGER},
    photo_url:{ type: Sequelize.STRING},
    organization_id:{ type: Sequelize.STRING},
    association_id:{ type: Sequelize.INTEGER},
    bvn:{ type: Sequelize.STRING},
},{
    freezeTableName: true,
    timestamps: false
})


module.exports = {
    tax_offices, assessments, assessment_item_invoices, individual, assessment_items, companies
}

