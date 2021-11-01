const mongoose = require('mongoose');

// Schema for Cash order
const cashOrderSchema = mongoose.Schema({
                    cashOrderDate: {type: Date, required: true},
                    cashOrderNumber: {type: Number, required: true},
                    companyData: {type: String},
                    companyId: {type: String},
                    grNo: {type: String},
                    billingTotal: {type: Number, required: true},
                    gstRate: {type: Number},
                    embBreakUp: {type: String},
                    embText: {type: String},
                    embCharge: {type: Number},
                    disc: {type: Number},
                    transCharge: {type: Number},
                    netAmount: {type: Number, required: true},
                    table: {type: Array, required: true}
                });

module.exports = mongoose.model('CashOrder', cashOrderSchema);