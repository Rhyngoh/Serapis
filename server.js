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
require("./routes/quarries-api-routes.js")(app); //db
require("./routes/rude-mechs-api-routes.js")(app); //db
//require("./routes/wee-warriors-api-routes.js")(app);
require("./routes/axis-enrichment-api-routes.js")(app);
require("./routes/austin-village-academy-api-routes.js")(app);
require("./routes/semillitas-de-espanol-api-routes.js")(app);
require("./routes/lake-travis-stem-academy-api-routes.js")(app);
//require("./routes/acrotex-api-routes.js")(app);
require("./routes/austin-kula-karate-api-routes.js")(app); //db
require("./routes/4-reelz-school-of-film-api-routes.js")(app);
require("./routes/georgetown-spanish-academy-api-routes.js")(app);

  app.get("/scrape", function(req, res) {
        res.send("Scrape Camp Eagle using /scrape/campeagle \n" + 
          "Scrape Quarries Camp using /scrape/quarries \n" + 
          "Scrape Rude Mechs using /scrape/rude-mechs \n" +
          "Scrape Axis Enrichment using /scrape/axis-enrichment \n" + 
          "Scrape Austin Village Academy using /scrape/austin-village-academy \n" + 
          "Scrape Semillitas De Esapnol using /scrape/semillitas-de-espanol \n" + 
          "Scrape Lake Travis STEM Academy using /scrape/lake-travis-stem-academy \n" +
          "Scrape Austin Kula Karate using /scrape/austin-kula-karate \n" +
          "Scrape 4 reelz school of film using /scrape/4-reelz-school-of-film/(filmmaking/stop-motion-lego/utubers-unite \n" + 
          "Scrape Georgetown Spanish Academy using /scrape/georgetown-spanish-academy");
    });

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });
});

