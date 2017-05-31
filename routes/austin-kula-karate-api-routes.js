//
//For some reason it's not adding the campdescription into the database but it shows on the json
//
var db = require("../models");
var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");
var bodyparser = require('body-parser');

module.exports = function(app) {

    app.use(bodyparser.json());
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
                    var image = $(this).children(".enrollment_box_image").children("img").attr("src").split("?")[0];
                    var sessiontitle = $(this).children(".enrollment_box_text").children(".not_entire").text();
                    var instructorname = $(this).children(".enrollment_box_text").children(".not_entire").children(".instructor").children("a").children().eq(0).text() + " " + $(this).children(".enrollment_box_text").children(".not_entire").children(".instructor").children("a").children().eq(1).text();
                    var instructorlink = "austinkulakarate.com" + $(this).children(".enrollment_box_text").children(".not_entire").children(".instructor").children("a").attr("href");
                    var nextsession = $(this).children(".enrollment_box_text").children(".bold_date").text();
                    var startend = $(this).children(".enrollment_box_text").children(".start_end").text().split("from ")[1];
                    if(startend){
                        var enrollstartdate = startend.split(" - ")[0];
                        var enrollenddate = startend.split(" - ")[1];
                    }
                    var campdescription = $(this).children(".enrollment_box_text").children(".desc_text").children(".description").children().eq(0).text();
                    var extrainfo = $(this).children(".enrollment_box_text").children(".desc_text").children(".description").children().nextAll().text();
                    metadata = {
                        image: image,
                        startend: startend,
                        sessiontitle: sessiontitle,
                        instructorname: instructorname,
                        instructorlink: instructorlink,
                        nextsession: nextsession,
                        enrollstartdate: enrollstartdate,
                        enrollenddate: enrollenddate,
                        campdescription: campdescription,
                        extrainfo: extrainfo,

                    };
                    results.push(metadata);
                    //console.log(metadata);
                });
                res.json(results);
                //loop through the json results and add each into mysql
                for(var i = 1; i < results.length; i++){
                    //find or create, check first to see if link exists else create new
                    db.austinkulakarate.findOrCreate({where: {image: results[i].image},
                        defaults: {image: results[i].image,
                        startend: results[i].startend,
                        sessiontitle: results[i].sessiontitle,
                        instructorname: results[i].instructorname,
                        instructorlink: results[i].instructorlink,
                        nextsession: results[i].nextsession,
                        enrollstartdate: results[i].enrollstartdate,
                        enrollenddate: results[i].enrollenddate,
                        campdescription: results[i].campdescription,
                        extrainfo: results[i].extrainfo}
                    })
                }
            }

        });


    });

};