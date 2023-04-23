/** 
Title: app.js
Author: Janis Gonzalez
Date: 03/19/23
Description: app.js for web-420
*/

"use strict";

//Requiring the paths
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composerAPI = require("./routes/gonzalez-composer-routes");
const personAPI = require("./routes/gonzalez-person-routes");
const userAPI = require("./routes/gonzalez-session-routes.js");

const app = express();

// holds server port value
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose connection
const conn = "mongodb+srv://web420db.3t4v4ax.mongodb.net/web420DB";

// displays connection success or error messages
mongoose.connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
});

// file annotations for openapi
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],

};

// openapi variable
const openapiSpecification = swaggerJsdoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", composerAPI);
app.use("/api", personAPI);
app.use("/api", userAPI);

// use http library to create a port and log to the console the port is listening to
http.createServer(app).listen(app.get("port"), function() {
    console.log(`Application started and listening on port ${app.get("port")}`);
});