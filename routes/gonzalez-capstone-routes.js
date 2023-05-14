/*
 Title: gonzalez-capstone.js
 Author: Janis Gonzalez
 Date: 5/14/2023
 Description: capstone routes for WEB-420
*/

const express = require('express');
const router = express.Router();
const Teams = require('../models/gonzalez-capstone.js');

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     description: API for creating a new team document.
 *     summary: creates a new team document.
 *     requestBody:
 *       description: creation of team.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Array of team documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/teams', async(req, res) => {
    try {
        let newTeam = {
            name: req.body.name,
            mascot: req.body.mascot,
        };

        await Teams.create(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(team);
                res.json(team);
            }
        });
    } catch (e) {
        console.log(e)
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${e.message}`,
        });
    }
});


/**
 * findAllTeams
 * @openapi 
 * /api/teams:
 *   get:
 *     tags: 
 *       - Teams 
 *     description: API for returning an array of Teams objects.
 *     summary: returns an array of Teams in JSON format.
 *     responses: 
 *        '200': 
 *           description: array of teams.
 *        '500': 
 *           description: Server Exception 
 *        '501': 
 *           description: MongoDB Exception. 
 */
router.get('/teams', async(req, res) => {
    try {
        Teams.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(teams);
                res.json(teams);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`,
        });
    }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for looking up players in a team
 *     summary: looks up players in a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: players by team id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/teams/:id/players', async(req, res) => {
    try {
        Teams.findOne({ '_id': req.params.id }, function(err, players) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(players);
                res.json(players);
            }
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            'message': `Server Exception: ${e.message}`,
        });
    }
});

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a team
 *     summary: deletes a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: team document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/teams/:id', async(req, res) => {
    try {
        Teams.findByIdAndDelete({ '_id': req.params.id }, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
            }

        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`

        })
    }
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: This API will add a player to the team
 *     summary: adds new players to existing team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description:
 *         schema:
 *           type: string
 *     requestBody:
 *       description: player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams/:id/players', async(req, res) => {
    try {
        await Teams.findOne({ _id: req.params.id }, function(err, team) {
            let newPlayer = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                salary: req.body.salary,
            };
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: `MongoDB Exception: ${err}`,
                });
            } else {
                team.players.push(newPlayer);
                team.save(function(err, Teams) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(Teams);
                        res.json(Teams);
                    }
                });
            }
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: `Server Exception: ${e.message}`,
        });
    }
});

//export the route
module.exports = router;