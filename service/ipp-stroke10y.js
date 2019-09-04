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
  const url = 'http://kgrid-activator.herokuapp.com/ipp/stroke10y/v0.0.2/stroke10y';
  const data = req.body.context;
  console.log("Request: " + JSON.stringify(req.body, null, 4));

  let age = getAge(req.body.context.prefetch.patient.birthdate);
  let input = {"features": {"age": age}}
  axios.post(url, input , axiosConfig ).
  then((response) => {
    console.log('response' + response.data.result)
    prob = response.data.result.stroke10y.split(",")[req.body.context.features.age];
    let aCard = new Card( "Stroke 10-year Risk", prob , "label", "url", "info");
    let responseObject =  { payload: { cards: [ aCard ]} };
    res.send( responseObject );
  });

};
