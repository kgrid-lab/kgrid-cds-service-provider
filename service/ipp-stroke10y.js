const axios = require('axios');
const getAge = require('get-age');
const jp = require('jsonpath');


function Card(summary, detail, label, url, indicator) {
  this.summary = summary;
  this.detail = detail;
  this.source ={'label':label, 'url':label};
  this.indicator = indicator;
}


module.exports = function(req, res, next) {

  const axiosConfig = {
    headers: { Accept: 'application/json' }
  };
  const url = 'http://kgrid-activator.herokuapp.com/ipp/stroke10y/v0.0.2/stroke10y';
  const data = req.body.context;
  console.log("Request: " + JSON.stringify(req.body, null, 4));

  let age = getAge(req.body.prefetch.patient.birthDate);
  let gender = req.body.prefetch.patient.gender;
  let systolic = jp.query(req.body.prefetch.systolicBloodPressureObservation, '$..entry[0].resource.component[?(@.code.coding[0].code=="8480-6")].valueQuantity.value')[0];
  let input = {"features": {"age": age, "gender": gender, "systolic": systolic}};
  axios.post(url, input , axiosConfig ).
  then((response) => {
    prob = response.data.result.stroke10y.split(",")[age];
    let aCard = new Card( "Stroke 10-year Risk", prob , "label", "url", "info");
    let responseObject =  { cards: [ aCard ] };
    res.send( responseObject );
  });

};
