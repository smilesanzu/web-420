/*
==============================================================================
 Title: gonzalez-customer.js
 Author: Janis Gonzalez
 Date: 04/30/23
 Description: customer schema for API
=================================================================================================================
*/

const mongoose = require('mongoose'); //variable for mongoose require statement
const Schema = mongoose.Schema; //schema variable assigned to mongoose schema object

let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
});

let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
});

let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
});

module.exports = mongoose.model("Customer", customerSchema);