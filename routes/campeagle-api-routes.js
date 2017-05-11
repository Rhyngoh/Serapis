var CampEagle = require("../models").CampEagle;
var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {

    

    app.get("/scrape/campeagle", function(req, res) {
        request("https://campeagle.org/summer/adventure-for-the-city.php", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var generalInfo = $("article div.main-content-container section");
                var campTitle = $(generalInfo).find(".main-title").text();
                var ageRange = $(generalInfo).find(".main-sub-title").text();
                var campDesc = $(generalInfo).find("p.gold-main-paragraph").text();
                var purpose = $(generalInfo).children().eq(2).children().find("p").text();
                var philosophy = $(generalInfo).children().eq(3).children().find("p").text();
                var expect = $(generalInfo).children().eq(4).children().find("p").text();
                var metadata = {
                  camptitle : campTitle,
                  agerange : ageRange,
                  campdesc : campDesc,
                  purpose : purpose,
                  philosophy : philosophy,
                  expect : expect

                }
                results.push(metadata);
                $("table.headwaters tbody tr td.bold").each(function(i, element) {
                    var campname = $(this).parent().parent().parent().parent().parent().siblings(".top-margin").children().children().children().next().text();
                    var rate = $(this).prev().text();
                    var date = $(this).prev().prev().text();
                    var session = $(this).prev().prev().prev().text();
                    var title = $(this).children("a").text();
                    var link = $(this).children("a").attr("href");
                    metadata = {
                        campname: campname,
                        session: session,
                        date: date,
                        rate: rate,
                        title: title,
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