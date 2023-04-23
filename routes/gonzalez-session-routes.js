/*
==============================================================================
 Title: gonzalez-session-routes.js
 Author: Janis Gonzalez
 Date: 04/23/23
 Description: user schema for API
=================================================================================================================
*/

const express = require('express');
const router = express.Router();
const User = require("../models/gonzalez-user");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     description:  API for creating a new username
 *     summary: creates a new username
 *     requestBody:
 *       description: creation of username
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                  type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '401':
 *         description: Username already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/signup", async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress,
        };

        await User.create(newRegisteredUser, function(err, password) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception ${err}`,
                });
            } else {
                console.log(password);
                res.json(password);
            }
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${message}`,
        });
    }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     description: API for logging into username
 *     summary: allows login for username
 *     requestBody:
 *       description: log into username
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/login", async(req, res) => {
    try {
        User.findOne({ userName: req.body.userName }, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception; ${err}`,
                });
            } else {
                console.log(user);
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );

                    if (passwordIsValid) {
                        console.log("User logged in");
                        res.status(200).send({
                            message: "User logged in",
                        });
                    } else {
                        console.log("Invalid username and/or password");
                        res.status(401).send({
                            message: `Invalid username and/or password`
                        });
                    }
                }
            }
            if (!user) {
                console.log("Invalid username and/or password");
                res.status(401).send({
                    message: `Invalid username and/or password`
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${e}`,
        });
    }
});

module.exports = router;