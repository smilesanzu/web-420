/*
==============================================================================
 Title: gonzalez-user.js
 Author: Janis Gonzalez
 Date: 04/23/23
 Description: user schema for API
=================================================================================================================
*/

// variable for mongoose require statement
const mongoose = require('mongoose');
// schema variable assigned to mongoose schema object
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: String },
});
// export
module.exports = mongoose.model("User", userSchema);