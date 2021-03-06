const app = require('./index.js');
const winston = require('winston'),
    expressWinston = require('express-winston');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
  )
}));

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("express-winston demo listening on port %d in %s mode", this.address().port, app.settings.env);
  console.log("App running at http://localhost:" + this.address().port);
});
