'use strict'

const express = require('express');
const app = express();
const routes = require('./routes');
const log = require('./bin/config').log;
const bodyParser = require('body-parser');
const url = require('url');


//Expect a JSON body
app.use(bodyParser.json({
    limit: '50mb'                   //Request size - 50MB
}));

//Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
        res.status(200).send();
    } else {
        next();
    }
});


//Health Checker
app.use('/healthz', async (req, res) => {

    return res.status(200).json({
        ping: 'PONG'
    }) 
});


//Version
app.use('/ver', (req, res) => {
    res.status(200).send('0.1.0');
});



//------------------------- Open Routes -------------------------//
app.use('/test', routes.test);
app.use('/userAction', routes.userActions);




//Common error handler
app.use(function errorHandler(err, req, res, next){
    if (res.headersSent) {
        log.error(`Name: ${err.name},  End-point: ${req.originalUrl}, Message: ${err.message.message}, StatusCode: ${err.statusCode}, Internal Code: ${err.message.internalCode}, DevMessage: ${err.message.devMessage}, Address: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
        return;
    }

    
    log.error(`Name: ${err.name},  End-point: ${req.originalUrl}, Message: ${err.message.message}, StatusCode: ${err.statusCode}, Internal Code: ${err.message.internalCode}, DevMessage: ${err.message.devMessage}, Address: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
   
    if (process.env.NODE_ENV !== 'production') {

        //err.message now has only 3 own properties. We need to get "stack" and "message" properties front 
        Object.defineProperty(err.message, 'message', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: err.message.message
        });

        Object.defineProperty(err.message, 'stack', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: err.message.stack
        });


        res.status(err.statusCode).json(err.message);
    }    
    else {

        //Delete unnecessary fileds in production
        delete err.message.type;
        delete err.message.devMessage;
        delete err.message.internalCode;
        res.status(err.statusCode).json(err.message); 
    }

}) 


module.exports = app;