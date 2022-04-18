'use strict'
const express = require('express');
const router = express.Router();
const httpError = require('throw.js');
const {appError} = require('../bin/config.js');

//Here is the API for saving and get back the session data 
router.post('/login', async (req, res, next) => {

    try {
        
        if(typeof req.body.phoneNum === 'undefined' && typeof req.body.password === 'undefined')
            return res.status(400).send("Required fields are missing");

        if(req.body.phoneNum === '0710404632' && req.body.password === 'janaka'){

            res.status(200).send({"userData" : {phoneNum : req.body.phoneNum, password : req.body.password}});
        }else{
            res.status(400).send("Incorrect user name or password");
        }

    } catch (error) {
        res.status(500).send(error);
    }
    
})

module.exports = router;