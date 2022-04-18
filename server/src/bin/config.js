'use strict'

const winston = require('winston');



/* ---Configure logging--- */

var logLevel;
var deep_debug = false;         //Enable this if you need all silly log messages

if (process.env.NODE_ENV === 'production')
    logLevel = 'info'
else
    logLevel = 'debug'
    
if (deep_debug)
    logLevel = 'silly';

var log = winston.createLogger({
    level: logLevel, 
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
})



/* --- Error class ---*/
var appError = class appError extends Error {

    constructor(eType, iCode, devMessage, eCode, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, appError);
        }

        this.type = eType; 
        this.internalCode = iCode;  
        this.devMessage = devMessage;
        this.errorCode = eCode;   

    }

    static get types() {
        return this.getTypes();
    };

    static getTypes() {
        return {
            systemError: 0,
            securityError: 1,
            userError: 2
        }
    }

    static shouldLog(err) {
        return err.type === this.getTypes().securityError || err.type === this.getTypes().systemError
    }
};

/* --- Export modules--- */
module.exports.log = log;
module.exports.appError = appError;