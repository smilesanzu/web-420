/*
======================================
 Title: gonzalez-person.js 
 Author: Janis Gonzalez
 Date: 04/16/2023
 Description: person API 
=====================================
*/

// require statement for mongoose
const mongoose = require('mongoose');

// define new mongoose schema
const Schema = mongoose.Schema;

// defines the role schema
let roleSchema = new Schema({
    text: { type: String }
})

// defines the dependent schema
let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
})

// defines the person schema
let personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
})

// exports the model
module.exports = mongoose.model('Person', personSchema);