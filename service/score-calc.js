const axios = require('axios');
const getAge = require('get-age')

function Card(summary, detail, label, url, indicator) {
  this.summary = summary;
  this.detail = detail;
  this.source ={'label':label, 'url':label}
  this.indicator = indicator;
}


module.exports = function(req, res, next) {

  const axiosConfig = {
    headers: { Accept: 'application/json' }
  };
  const url = 'http://kgrid-activator.herokuapp.com/score/calc/v0.3.0/score';

  let age = getAge(req.body.context.patient.birthdate);

  const data = {
    "age": age,
    "gender": req.body.context.patient.gender,
    "risk": req.body.context.observation.risk,
    "sbp": req.body.context.observation.sbp,
    "cholesterol": req.body.context.observation.cholesterol,
    "smoker": req.body.context.observation.smoker
  }

  axios.post(url, data , axiosConfig ).
  then((response) => {
    let aCard = new Card( "CVD Risk Score", response.data.result , "label", "url", "info");
    let responseObject =  {cards: [ aCard ]};
    res.send( responseObject );
  });


};
