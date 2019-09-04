const express = require('express');

const router = express.Router();
const serviceDefinitions = require('../service-definitions');
const helloWorld = require('../service/hello-world');
const scoreCalc = require('../service/score-calc');
const opioidFinder = require('../service/opioid-finder');
const stroke10y = require('../service/ipp-stroke10y');

// Discovery Endpoint
router.get('/', (request, response) => {
  const discoveryEndpointServices = {
    services: serviceDefinitions,
  };
  response.json(discoveryEndpointServices);
});

router.use('/hello-world', helloWorld);
router.use('/score-calc', scoreCalc);
router.use('/opioid-finder', opioidFinder);
router.use('/ipp-stroke10y', stroke10y);

module.exports = router;
