var Quarries = require("../models").Quarries;
var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {
    app.get("/scrape/quarries", function(req, res) {
        request("http://www.quarriesrec.org/Default.aspx?tabid=885183", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                $("#BSBContent #BSBGrid .grid-wrapper .grid-body .grid-row").each(function(i, element) {
                    var campname = $(this).parent().siblings(".grid-header").children(".grid-title").text();
                    var registrationarray = $(this).children().first().children().children(".row-text").text();
                    var registrationstart = registrationarray.split("Start")[0].split(": ")[1].split(" ")[0];
                    var registrationend = registrationarray.split("Start")[0].split(": ")[1].split(" ")[2];
                    var campoptions = $(this).children().first().children().children(".row-title").text();
                    var campdescription = $(this).parent().siblings(".grid-header").children(".row-text").text();
                    var campstart = registrationarray.split("Start")[1].split(": ")[1].split(" ")[0];
                    var campend = registrationarray.split("Start")[1].split(": ")[1].split(" ")[2].split("\r")[0];
                    var price = "$" + $(this).children().find(".amount-text").text();
                    var link = "http://www.quarriesrec.org" + $(this).children().find("#registerNow").attr("href");
                    metadata = {
                        campname: campname,
                        campdescription: campdescription,
                        campoptions: campoptions,
                        registrationstart: registrationstart,
                        registrationend: registrationend,
                        campstart: campstart,
                        campend: campend,
                        price: price,
                        link: link
                    };
                    results.push(metadata);
                    console.log(metadata);
                });
                res.json(results);
            }

        });


    });

};