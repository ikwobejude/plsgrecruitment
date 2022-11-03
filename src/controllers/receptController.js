const { assessments } = require("../model/assessmentModels");



module.exports.viewRevenueReceipt = async (req, res) => {


    let perPage = 20;   // number of records per page
    var page = req.query.page || 1
    let offset = perPage * page - perPage;
    let settlement_status = 0;
    if (req.user.group_id == 190) {
        if (req.query.search == "1") {

            let data = await assessments.findAll({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.user.username && { tax_payer_rin: { [Op.like]: `${req.user.username}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }
            });
            let count = await assessments.count({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.user.username && { tax_payer_rin: { [Op.like]: `${req.user.username}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }

            });

            res.render('./receipt/view_revenue_invoices', {
                data,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        }
        let data = await assessments.findAll({ where: { tax_payer_rin: req.user.username, settlement_status: settlement_status }, limit: perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        let count = await assessments.count({ where: { tax_payer_rin: req.user.username, settlement_status: settlement_status }, perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        res.render('./receipt/view_revenue_invoices', {
            data,
            current: page,
            pages: Math.ceil(count / perPage)
        })
    } else {
        if (req.query.search == "1") {

            let data = await assessments.findAll({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.query.tax_payer_rin && { tax_payer_rin: { [Op.like]: `${req.query.tax_payer_rin}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }
            });
            let count = await assessments.count({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.query.tax_payer_rin && { tax_payer_rin: { [Op.like]: `${req.query.tax_payer_rin}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }

            });

            res.render('./receipt/view_revenue_invoices', {
                data,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        }
        let data = await assessments.findAll({ where: { settlement_status: settlement_status }, limit: perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        let count = await assessments.count({ where: { settlement_status: settlement_status }, limit: perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        res.render('./receipt/view_revenue_invoices', {
            data,
            current: page,
            pages: Math.ceil(count / perPage)
        })
    }

}


module.exports.viewPaymentIn = async (req, res) => {
    // try {
    // var rates = `${currentYear - 1}/${currentYear}`;

    let perPage = 20;   // number of records per page
    var page = req.query.page || 1
    let offset = perPage * page - perPage;
    let settlement_status = 1;

    if (req.user.group_id == 190) {
        if (req.query.search == "1") {

            let data = await assessments.findAll({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.user.username && { tax_payer_rin: { [Op.like]: `${req.user.username}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }
            });
            let count = await assessments.count({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.user.username && { tax_payer_rin: { [Op.like]: `${req.user.username}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }

            });

            res.render('./receipt/view_payment_receipt', {
                data,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        }
        let data = await assessments.findAll({ where: { tax_payer_rin: req.user.username, settlement_status: settlement_status }, limit: perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        let count = await assessments.count({ where: { tax_payer_rin: req.user.username, settlement_status: settlement_status }, perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        res.render('./receipt/view_payment_receipt', {
            data,
            current: page,
            pages: Math.ceil(count / perPage)
        })
    } else {
        if (req.query.search == "1") {

            let data = await assessments.findAll({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.query.tax_payer_rin && { tax_payer_rin: { [Op.like]: `${req.query.tax_payer_rin}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }
            });
            let count = await assessments.count({
                where: {
                    [Op.and]: [
                        settlement_status && { settlement_status: { [Op.like]: `${settlement_status}` } },
                        req.query.tax_payer_name && { tax_payer_name: { [Op.like]: `${req.query.tax_payer_name}` } },
                        req.query.tax_payer_rin && { tax_payer_rin: { [Op.like]: `${req.query.tax_payer_rin}` } },
                        req.query.invoice_number && { invoice_number: { [Op.like]: `${req.query.invoice_number}` } }
                    ],
                }

            });

            res.render('./receipt/view_payment_receipt', {
                data,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        }
        let data = await assessments.findAll({ where: { settlement_status: settlement_status }, limit: perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        let count = await assessments.count({ where: { settlement_status: settlement_status }, perPage, offset: offset, order: [['assessment_id', 'DESC']] },);
        res.render('./receipt/view_payment_receipt', {
            data,
            current: page,
            pages: Math.ceil(count / perPage)
        })
    }


}