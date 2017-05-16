var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {


    app.get("/scrape/axis-enrichment", function(req, res) {
        request("http://www.axisenrichment.com/", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var title = $(".wsite-section-content .container .wsite-section-elements h2.wsite-content-title").text();
                var dateregex = new RegExp("(January|February|March|April|May|June|July|August|September|October|November|December)");
                var sessiona = $("h2.wsite-content-title").next().find(".wsite-multicol-col").eq(0).children().children().text();
                var session1 = {
                	sessiontitle: sessiona.split(dateregex)[0].slice(0,9),
                	sessionname: sessiona.split(dateregex)[0].slice(9),
                	sessiondate: sessiona.split(sessiona.split(dateregex)[0].slice(9))[1]
                }
                var sessionb = $("h2.wsite-content-title").next().find(".wsite-multicol-col").eq(1).children().children().text();
                var session2 = {
                	sessiontitle: sessionb.split(dateregex)[0].slice(0,9),
                	sessionname: sessionb.split(dateregex)[0].slice(9),
                	sessiondate: sessionb.split(sessionb.split(dateregex)[0].slice(9))[1]
                }
                var sessionc = $("h2.wsite-content-title").next().find(".wsite-multicol-col").eq(2).children().children().text();
                var session3 = {
                	sessiontitle: sessionc.split(dateregex)[0].slice(0,9),
                	sessionname: sessionc.split(dateregex)[0].slice(9),
                	sessiondate: sessionc.split(sessionc.split(dateregex)[0].slice(9))[1]
                }
                var tuitionlocation = $(".wsite-multicol div table.wsite-multicol-table tbody tr td.wsite-multicol-col .paragraph span").children("font").eq(1).text();
                var tuition = "T" + tuitionlocation;
                var tuitiondeal = $(".wsite-multicol div table.wsite-multicol-table tbody tr td.wsite-multicol-col .paragraph span").next().text();
                var location = $(".wsite-multicol div table.wsite-multicol-table tbody tr td.wsite-multicol-col .paragraph span").children("font").text().split(tuition)[1];
                var time = $(".wsite-multicol div table.wsite-multicol-table tbody tr td.wsite-multicol-col .paragraph font span").text().split(tuitiondeal)[1];
                var link = "www.axisenrichment.com" + $("div a.wsite-button").attr("href");
                metadata = {
                        title: title,
                        session1: session1,
                        session2: session2,
                        session3: session3,
                        tuition: tuition,
                        tuitiondeal: tuitiondeal,
                        time: time,
                        location: location,
                        link: link
                    };
                results.push(metadata);
                console.log(metadata);
                res.json(results);
            }

        });


    });

};