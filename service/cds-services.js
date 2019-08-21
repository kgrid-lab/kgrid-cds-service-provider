const express = require('express');

const router = express.Router();
const serviceDefinitions = require('../service-definitions');
const helloWorld = require('../service/hello-world');
const scoreCalc = require('../service/score-calc');
const bmiCalc = require('../service/bmi-calc');

// Discovery Endpoint
router.get('/', (request, response) => {
  const discoveryEndpointServices = {
    services: serviceDefinitions,
  };
  response.json(discoveryEndpointServices);
});

router.use('/hello-world', helloWorld);
router.use('/score-calc', scoreCalc);
router.use('/bmi-calc', bmiCalc);

module.exports = router;
