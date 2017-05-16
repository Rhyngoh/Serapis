var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {
    app.get("/scrape/rude-mechs", function(req, res) {
        request("https://rudemechs.com/offcenterteens/", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var title = $("article div.entry").children("h4").eq(1).text();
                var about = $("article div.entry .su-accordion").children().first().children().last().children().text();
                var details = $("article div.entry .su-accordion").children().eq(1).children().eq(1).children();
                var duration = details.slice(1).eq(0).text() + "\n" + details.slice(2).eq(0).text() + "\n" + details.slice(3).eq(0).text();
                var performance = details.slice(4).eq(0).text() + "\n" + details.slice(5).eq(0).text();
                var location = details.slice(7).eq(0).text() + "\n" + details.slice(8).eq(0).text() + "\n" + details.slice(9).eq(0).text();
                var who = details.slice(11).eq(0).text() + "\n" + details.slice(12).eq(0).text();
                var cost = details.slice(14).eq(0).text() + "\n" + details.slice(15).eq(0).text();
                var link = $("article div.entry .su-accordion").children().eq(2).children().eq(1).children().children("iframe").attr("src");
                metadata = {
                        title: title,
                        about: about,
                        duration: duration,
                        performance: performance,
                        location: location,
                        who: who,
                        cost: cost,
                        link: link

                    };
                results.push(metadata);
                console.log(metadata);
                res.json(results);
            }

        });


    });

};