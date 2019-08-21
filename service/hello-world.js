

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
    //let responseObject =  { payload: { cards: [ aCard ]} };
    let responseObject = JSON.parse("{\n"
        + "  \"cards\": [\n"
        + "    {\n"
        + "      \"summary\": \"Example Card\",\n"
        + "      \"indicator\": \"info\",\n"
        + "      \"detail\": \"This is an example card.\",\n"
        + "      \"source\": {\n"
        + "        \"label\": \"Static CDS Service Example\",\n"
        + "        \"url\": \"https://example.com\",\n"
        + "        \"icon\": \"https://example.com/img/icon-100px.png\"\n"
        + "      },\n"
        + "      \"links\": [\n"
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
        + "      ]\n"
        + "    },\n"
        + "    {\n"
        + "      \"summary\": \"Another card\",\n"
        + "      \"indicator\": \"warning\",\n"
        + "      \"source\": {\n"
        + "        \"label\": \"Static CDS Service Example\"\n"
        + "      }\n"
        + "    }\n"
        + "  ]\n"
        + "}");
    res.send( responseObject );
  });


};


