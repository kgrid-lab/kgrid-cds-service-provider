

const axios = require('axios');

function Card(summary, detail, label, url, indicator, links) {
  this.summary = summary;
  this.detail = detail;
  this.source ={'label':label, 'url':label}
  this.indicator = indicator;
  this.links = links;
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

    let links = JSON.parse("[\n"
        + "        {\n"
        + "          \"label\": \"Google\",\n"
        + "          \"url\": \"https://google.com\",\n"
        + "          \"type\": \"absolute\"\n"
        + "        },\n"
        + "        {\n"
        + "          \"label\": \"Github\",\n"
        + "          \"url\": \"https://github.com\",\n"
        + "          \"type\": \"absolute\"\n"
        + "        },\n"
        + "        {\n"
        + "          \"label\": \"SMART Example App\",\n"
        + "          \"url\": \"https://smart.example.com/launch\",\n"
        + "          \"type\": \"smart\",\n"
        + "          \"appContext\": \"{\\\"session\\\":3456356,\\\"settings\\\":{\\\"module\\\":4235}}\"\n"
        + "        }\n"
        + "      ]");
    let aCard = new Card( "Hello World", response.data.result , "label", "url", "info", links);
    links.push({label: "new link", url: "http://yahoo.com", type: "absolute"});
    let card2 = new Card("Hello links", response.data.result, "label", "url", "warning", links);
    let responseObject =  { cards: [ aCard ]};
    res.send( responseObject );
  });


};


