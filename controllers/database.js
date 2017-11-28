/*DEPENDENCIES*/
const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoDBURI = process.env.MONGODB_URI ||
     'mongodb://JBernsteinIV:UpdateWhenPossible1@ds259105.mlab.com:59105/heroku_4mhc0758';
const bodyParser = require('body-parser');
//const path = require('path');
//const queryString = require('querystring');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Helper function for error detection of collections.
function dataInsertion(collection, data) {
    return collection.insertOne(data, function(error) {
       if (error) throw error;
    });
}
//Helper function for generating random ID. Adapted from project notes.
function generateID() {
    return Math.floor((Math.random() * 1000000000000) +1);
}
/*MAIN*/
module.exports.storeData = function(request, response, next) {
    mongodb.MongoClient.connect(mongoDBURI, function(error, db) {
            if (error) throw error;
            //Database Collections
            const CUSTOMERS = db.collection('CUSTOMERS');
            const BILLING = db.collection('BILLING');
            const SHIPPING = db.collection('SHIPPING');
            const ORDERS = db.collection('ORDERS');
        //Databsse schemas
        const customerSchema = {
            _id: shipment_info['id'],
            FIRSTNAME: shipment_info['fname'],
            LASTNAME: shipment_info['lname'],
            STREET: shipment_info['add1'] + shipment_info['add2'],
            CITY: shipment_info['city'],
            STATE: shipment_info['state'],
            ZIP: shipment_info['zipcode'],
            EMAIL: shipment_info['email']
        };
        const billingSchema = {
            _id: shipment_info['id'],
            CUSTOMER_ID: shipment_info['customerID'],
            CREDITCARDTYPE: shipment_info['cctype'],
            CREDITCARDNUM: shipment_info['ccnum'],
            CREDITCARDSECURITYNUM: shipment_info['ccsecnum']
        };
        const shippingSchema = {
            _id: shipment_info['id'],
            SHIPPING_STREET: shipment_info['add1'] + shipment_info['add2'],
            SHIPPING_CITY: shipment_info['city'],
            SHIPPING_STATE: shipment_info['state'],
            SHIPPING_ZIP: shipment_info['zip']
        };
        const ordersSchema = {
            _id: shipment_info['id'],
            CUSTOMER_ID: shipment_info['customerID'],
            BILLING_ID: shipment_info['billingID'],
            SHIPPING_ID: shipment_info['shippingID'],
            DATE: shipment_info['date'],
            PRODUCT_VECTOR: {
                productID: shipment_info['productID'],
                quantity: shipment_info['qty'],
                price: shipment_info['price']
            },
            ORDER_TOTAL: shipment_info['total']
        };

            //Attempt to insert data for each collection.
            dataInsertion(CUSTOMERS, customerSchema);
            dataInsertion(BILLING, billingSchema);
            dataInsertion(SHIPPING, shippingSchema);
            dataInsertion(ORDERS, ordersSchema);

            //Send info to storeData.ejs
            response.render('../views/storeData');

            db.close(function(error) {
                if (error) throw error;
            });
        }
    );
}
