var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {


    app.get("/scrape/wee-warriors", function(req, res) {
        request("http://weewarriors.com/index.php/class-schedule/", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                $("#eventContainer1 div.day .event").each(function(i, element) {
                    var date = $(this).siblings(".date-label").text();
                    var time = $(this).children(".event-summary").children(".event-time").attr("title").split(", ")[2];
                    var description = $(this).children(".event-summary").children(".event-title").text();
                    var link = "http://weewarriors.com/index.php/class-schedule/";
                    var contactphone = $(this).find(".social-media .container .dt-phone p i").text();
                    metadata = {
                        date: date,
                        time: time,
                        description: description,
                        link: link,
                        contactphone: contactphone
                    };
                    results.push(metadata);
                    console.log(metadata);
                });
                res.json(results);
            }

        });


    });

};