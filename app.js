const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Item = require('./database/items');
const Customer = require('./database/customer');
const Bill = require('./database/bill');

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

app.post('/api/item', (req, res, next) => {
    const item = new Item({
        itemName: req.body.itemName
        // color: req.body.color,
        // size: req.body.size
    });
    item.save();
    res.status(201).json({
        'message': 'Item added Successfully!'
    });
});

module.exports = app;