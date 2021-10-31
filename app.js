const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Item = require('./database/items');
const Customer = require('./database/customer');
const Bill = require('./database/bill');
const CashOrder = require('./database/cashorder');

// MongoDB connection to Lavika Knitwears
mongoose.connect('mongodb+srv://dbadm:hssqHgYajGmRg553@cluster0.evbjt.mongodb.net/trendy?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.log(err);
    console.log('Something went wrong!');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});
// Fetch all Bills
app.use('/api/bills', (req, res, next) => {
    Bill.find().sort({"challanNumber": -1}).then((bills) => {
        res.status(200).json({
            "data": bills
        });    
    }).catch(err => {
        res.status(200).json({
            "message": "Bills could not be fetched successfully!",
             "data": err
         });         
    })            
});
// Fetch All Cash orders
app.use('/api/cashorders', (req, res, next) => {
    CashOrder.find().sort({"cashOrderNumber": -1}).then((cashorders) => {
        res.status(200).json(   {
            "data": cashorders
        });    
    }).catch(err => {
        res.status(200).json({
            "message": "Cash Orders could not be fetched successfully!",
             "data": err
         });         
    })            
});

// Fetch Latest challan number
app.get('/api/getLatestChallanNo', (req, res, next) => {
    Bill.findOne().select('challanNumber').sort('-challanNumber').then((data) => {
        res.status(200).json({
            "data": data
        })
    }).catch(err => {
        res.status(200).json({
            "message": "Could not fetch successfully!",
             "data": err
         });         
    })
});
// Fetch latest cash order number
app.get('/api/getLatestCashOrderNo', (req, res, next) => {
    CashOrder.findOne().select('cashOrderNumber').sort('-cashOrderNumber').then((data) => {
        res.status(200).json({
            "data": data
        })
    }).catch(err => {
        res.status(200).json({
            "message": "Could not fetch successfully!",
             "data": err
         });         
    })
});
// Fetch all items
app.get('/api/items', (req, res, next) => {
    Item.find().then((documents) => {
        res.status(200).json({
            "message": "Items fetched successfully!",
             "data": documents
         });    
    }).catch((err) => {
        res.status(200).json({
            "message": "Items could not be fetched successfully!",
             "data": err
         });    
    });
});

// Fetch a specific bill
app.get('/api/bill', (req, res, next) => {
    let orderId = req.query.orderId;
    if(orderId) {
        Bill.findOne({"challanNumber": orderId}).then(data => {
            if(data) {
                res.status(200).json({
                    "message": "Bill fetched successfully!",
                     data: data
                })
            } else {
                res.status(404).json({
                    "message": "Bill not found!",
                     data: []
                })
            }
        }).catch((err) => {
            res.status(500).json({
                "message": "Something went wrong!",
                 "data": err
             });  
        })
    }
})
app.get('/api/cashorder', (req, res, next) => {
    let orderId = req.query.orderId;
    if(orderId) {
        CashOrder.findOne({"cashOrderNumber": orderId}).then(data => {
            if(data) {
                res.status(200).json({
                    "message": "Cash Order fetched successfully!",
                     data: data
                })
            } else {
                res.status(404).json({
                    "message": "Cash Order not found!",
                     data: []
                })
            }
        }).catch((err) => {
            res.status(500).json({
                "message": "Something went wrong!",
                 "data": err
             });  
        })
    }
})
// Deletes a bill
app.post('/api/deleteBill', (req, res, next) => {
    console.log(req.body);
    Bill.updateOne({"challanNumber": req.body.challanNumber}, {"isDeleted": req.body.isDeleted}, {"returnOriginal": false}).then(data => {
        if (data) {
            res.status(201).json({
                "message": "Successfully Deleted",
                data: data
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            "message": "Something went wrong!",
             "data": err
         }); 
    })
});

// Create a bill
app.post('/api/bill', (req, res, next) => {
    const bill = new Bill({
        billDate: req.body.billDate,
        challanNumber: req.body.challanNumber,
        gstbillNumber: req.body.gstbillNumber,
        companyData: req.body.companyData,
        companyId: req.body.companyId,
        grNo: req.body.grNo,
        billingTotal: req.body.billingTotal,
        gstRate: req.body.gstRate,
        disc: req.body.disc,
        transCharge: req.body.transCharge,
        embText: req.body.embText,
        embBreakUp: req.body.embBreakUp,
        embCharge: req.body.embCharge,
        netAmount: req.body.netAmount,
        table: req.body.table
    });
    bill.save();
    res.status(201).json({
        "message": "Bill Added Successfully!!"
    })
});
// Create a cash order.
app.post('/api/cashorder', (req, res, next) => {
    const cashorder = new CashOrder({
        cashOrderDate: req.body.cashOrderDate,
        cashOrderNumber: req.body.cashOrderNumber,
        companyData: req.body.companyData,
        companyId: req.body.companyId,
        grNo: req.body.grNo,
        billingTotal: req.body.billingTotal,
        gstRate: req.body.gstRate,
        disc: req.body.disc,
        transCharge: req.body.transCharge,
        embText: req.body.embText,
        embBreakUp: req.body.embBreakUp,
        embCharge: req.body.embCharge,
        netAmount: req.body.netAmount,
        table: req.body.table
    });

    cashorder.save();
    res.status(201).json({
        "message": "Cash Order Added Successfully!!"
    })
});

// Fetch list of customers
app.get('/api/customers', (req, res, next) => {
    Customer.find().then((documents) => {
        res.status(200).json({
            "message": "Customers fetched successfully!",
             "data": documents
         });    
    }).catch((err) => {
        res.status(500).json({
            "message": "Something went wrong!",
             "data": err
         });  
    });
});

// Create a new customer
app.post('/api/customer', (req, res, next) => {
    const customer = new Customer({
        // companyName: req.body.companyName,
        custName: req.body.custName,
        // address: req.body.address,
        city: req.body.city
        // district: req.body.district,
        // state: req.body.state,
        // pin: req.body.pin,
        // mobile: req.body.mobile,
        // phone: req.body.phone,
        // email: req.body.email,
        // gstin: req.body.gstin
    });
    customer.save();
    res.status(201).json({
        'message': 'Customer Added Successfully!'
    });
})
// Create a new item
app.post('/api/item', (req, res, next) => {
    const item = new Item({
        itemName: req.body.itemName,
        addToTotal: req.body.addToTotal
        // color: req.body.color,
        // size: req.body.size
    });
    item.save();
    res.status(201).json({
        'message': 'Item added Successfully!'
    });
});

module.exports = app;