var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;
var db = require("./models");

app.get("/", function(req, res) {
  res.send("Scrape with /scrape");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

require("./routes/html-routes.js")(app);
require("./routes/campeagle-api-routes.js")(app);
require("./routes/quarries-api-routes.js")(app);

  app.get("/scrape", function(req, res) {
        res.send("Scrape Camp Eagle using /scrape/campeagle \nScrape Quarries Camp using /scrape/quarries");
    });

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });
});

