var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {
    app.get("/scrape/austin-kula-karate", function(req, res) {
        request("http://austinkulakarate.com/pages/enrollments", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var enrollmentdaterange = $("#le_mb_enrollments h2 .mb_enrollment_dates .enrollments_date_range").text();
                var metadata = {
                    enrollmentdaterange: enrollmentdaterange
                }
                results.push(metadata);
                $("#le_mb_enrollments .enrollment_box").each(function(i, element) {
                    var image = $(this).children(".enrollment_box_image").children("img").attr("src");
                    var sessiontitle = $(this).children(".enrollment_box_text").children(".not_entire").text();
                    var instructorname = $(this).children(".enrollment_box_text").children(".not_entire").children(".instructor").children("a").children().eq(0).text() + " " + $(this).children(".enrollment_box_text").children(".not_entire").children(".instructor").children("a").children().eq(1).text();
                    var instructorlink = "austinkulakarate.com" + $(this).children(".enrollment_box_text").children(".not_entire").children(".instructor").children("a").attr("href");
                    var nextsession = $(this).children(".enrollment_box_text").children(".bold_date").text();
                    var startend = $(this).children(".enrollment_box_text").children(".start_end").text().split("from ")[1];
                    if(startend){
                        var enrollstartdate = startend.split(" - ")[0];
                        var enrollenddate = startend.split(" - ")[1];
                    }
                    var description = $(this).children(".enrollment_box_text").children(".desc_text").children(".description").children().eq(0).text();
                    var extrainfo = $(this).children(".enrollment_box_text").children(".desc_text").children(".description").children().nextAll().text();
                    metadata = {
                        image: image,
                        sessiontitle: sessiontitle,
                        instructorname: instructorname,
                        instructorlink: instructorlink,
                        nextsession: nextsession,
                        enrollstartdate: enrollstartdate,
                        enrollenddate: enrollenddate,
                        description: description,
                        extrainfo: extrainfo,

                    };
                    results.push(metadata);
                    console.log(metadata);
                });
                res.json(results);
            }

        });


    });

};