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

  axios.post(url, data , axiosConfig ).
  then((response) => {
    console.log('response' + response.data.result)
    let aCard = new Card( "Opioid Detector", response.data.result , "label", "url", "info");
    let responseObject =  { payload: { cards: [ aCard ]} };
    res.send( responseObject );
  });

};
