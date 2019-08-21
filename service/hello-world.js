

const axios = require('axios');

function Card(summary, detail, label, url, indicator, links) {
  this.summary = summary;
  this.detail = detail;
  this.source ={'label':label, 'url':url}
  this.indicator = indicator;
  this.links = links;
}


module.exports = function(req, res, next) {

  const axiosConfig = {
    headers: { Accept: 'application/json' }
  };
  const url = 'http://kgrid-activator.herokuapp.com/hello/world/v0.2.0/welcome';
  const data = {"name": req.body.prefetch.patient.name[0].given[0] };

  axios.post(url, data , axiosConfig ).
  then((response) => {
    console.log('response' + response.data.result)

    links = [ { label: "google", url: "https://www.google.com", type: "absolute"},
      { label: "github", url: "https://www.github.com", type: "absolute"}];
    let aCard = new Card( "Hello World", response.data.result , "label", "url", "info", JSON.parse(JSON.stringify(links)));
    links.push({label: "yahoo", url: "http://yahoo.com", type: "absolute"});
    let card2 = new Card("Hello links", response.data.result, "label", "http://umich.edu", "warning", links);
    let responseObject =  { cards: [ aCard, card2 ]};
    res.send( responseObject );
  });

};


