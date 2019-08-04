const express = require('express');
const bodyParser = require('body-parser');
const cdsServices = require('./service/cds-services');
const defaultCors = require('./middleware/default-cors');
const errorHandler = require('./middleware/error-handler');
const winston = require('winston'),
    expressWinston = require('express-winston');


const app = express();


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
  )
}));

// This is necessary middleware to parse JSON into the incoming request body for POST requests
app.use(bodyParser.json());

// CDS Services must implement CORS to be called from a web browser
app.use(defaultCors);

app.set('json spaces', '  ');

app.use('/cds-services', cdsServices);

app.use((request, response, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle specified errors or return a 500 for internal errors
app.use(errorHandler);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
  )
}));

module.exports = app;
