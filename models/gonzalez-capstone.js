/*
 Title: gonzalez-capstone.js
 Author: Janis Gonzalez
 Date: 5/14/2023
 Description: capstone for WEB-420
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Player Schema **/

let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
});
/** Team Schema **/
let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema],
});
/** Export **/
module.exports = mongoose.model('Teams', teamSchema);