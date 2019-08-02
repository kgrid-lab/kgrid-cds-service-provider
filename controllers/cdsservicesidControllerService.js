'use strict'

module.exports.funccdsservicesidPOST = function funccdsservicesidPOST(req, res, next) {

  let service = require('../service/' + req.params.id);



  res.send( {
    payload: service.payload,
  });
};
