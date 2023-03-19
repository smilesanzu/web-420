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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const openapiSpecificaion = swaggerJSDoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecificaion));

app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})