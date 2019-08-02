'use strict'


module.exports.funccdsservicesGET = function funccdsservicesGET(request, response, next) {

  const serviceDefinitions = require('../service-definitions');
  const discoveryEndpointServices = {
    services: serviceDefinitions,
  };
  response.send(discoveryEndpointServices);

};
