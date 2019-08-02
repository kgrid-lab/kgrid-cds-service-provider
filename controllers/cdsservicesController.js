'use strict'

var varcdsservicesController = require('./cdsservicesControllerService');

module.exports.funccdsservicesGET = function funccdsservicesGET(req, res, next) {
  varcdsservicesController.funccdsservicesGET(req.swagger.params, res, next);
};