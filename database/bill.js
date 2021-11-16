const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
                    billDate: {type: Date, required: true},
                    challanNumber: {type: Number, required: true},
                    gstbillNumber: {type: String},
                    companyData: {type: String},
                    companyId: {type: String},
                    grNo: {type: String},
                    billingTotal: {type: Number, required: true},
                    gstRate: {type: Number},
                    embBreakUp: {type: String},
                    embText: {type: String},
                    embCharge: {type: Number},
                    freightText: {type: String},
                    disc: {type: Number},
                    discPercent: {type: Number},
                    transCharge: {type: Number},
                    netAmount: {type: Number, required: true},
                    table: {type: Array, required: true}
                });

module.exports = mongoose.model('Bill', billSchema);