

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
  const url = 'http://kgrid-activator.herokuapp.com/hello/world/v0.2.0/welcome';
  console.log("BODY IS: " + JSON.stringify(req.body, null, 4));
  const data = {"name": req.body.prefetch.patient.name[0].given[0] };

  axios.post(url, data , axiosConfig ).
  then((response) => {
    console.log('response' + response.data.result)
    let aCard = new Card( "Hello World", response.data.result , "label", "url", "info");
    let responseObject =  { payload: { cards: [ aCard ]} };
    res.send( responseObject );
  });


};


