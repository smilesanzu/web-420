/** 
Title: gonzalez-composer.js
Author: Janis Gonzalez
Date: 04/09/23
Description: composer JS file for web-420
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema

// composer schema with string types
let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

// exports
module.exports = mongoose.model('Composer', composerSchema);