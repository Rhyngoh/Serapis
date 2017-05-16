var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {
    app.get("/scrape/lake-travis-stem-academy", function(req, res) {
        request("http://www.ltstemacademy.org/enrichment/camps/art_and_design.html", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var maincontent = $("body div.content_responsive");
                var title = maincontent.children("h3.title").text();
                var age = maincontent.children("p").eq(0).text().split(": ")[1];
                var start = maincontent.children("p").eq(1).text().split(": ")[1];
                var end = maincontent.children("p").eq(2).text().split(": ")[1];
                var cost = maincontent.children("p").eq(3).text().split(": ")[1];
                var instructor = maincontent.children("p").eq(4).text().split(": ")[1];
                var description = maincontent.children("p").eq(6).text();
                var schedule1 = maincontent.children("p").eq(8).text();
                var schedule2 = maincontent.children("p").eq(9).text();
                var schedule3 = maincontent.children("p").eq(10).text();
                var schedule4 = maincontent.children("p").eq(11).text();
                var moreinfo = maincontent.children("p").eq(12).children("a").attr("href");
                var contact = maincontent.children("p").eq(13).children("a").attr("href").split(":")[1];
                var registerlink = "www.ltstemacademy.org/enrichment/" + maincontent.children().eq(18).attr("href").split("/")[1];
                metadata = {
                        title: title,
                        age: age,
                        start: start,
                        end: end,
                        cost: cost,
                        instructor: instructor,
                        description: description,
                        schedule: {
                            schedule1: schedule1,
                            schedule2: schedule2,
                            schedule3: schedule3,
                            schedule4: schedule4
                        },
                        moreinfo: moreinfo,
                        contact: contact,
                        registerlink: registerlink
                    };
                results.push(metadata);
                console.log(metadata);
                res.json(results);
            }

        });


    });

};