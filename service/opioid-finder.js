const axios = require('axios');

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
  const url = 'http://kgrid-activator.herokuapp.com/99999/10101/v0.0.2/opioidDetector';
  const data = req.body.context;
  console.log("Request: " + JSON.stringify(req.body, null, 4));

  axios.post(url, data , axiosConfig ).
  then((response) => {
    let message = "Opioid not detected";
    if(response.data.result.condition_satisfied) {
      message = "Opioid detected!"
    }
    let aCard = new Card( "Opioid Detector", message, "label", "url", "info");
    let responseObject =  { cards: [ aCard ]};
    res.send( responseObject );
  });

};
