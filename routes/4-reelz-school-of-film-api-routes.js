var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");
var db = require('../models');
var bodyparser = require('body-parser');

module.exports = function(app) {
    app.use(bodyparser.json());
    app.get("/scrape/4-reelz-school-of-film/:camp", function(req, res) {
        var querystring = "http://www.4reelzschooloffilm.com/courses/summer-camp-" + req.params.camp;
        request(querystring, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var content = $("#content div");
                var title = content.children(".summary").children("h1").text();
                var price = content.children(".summary").children(".price").text().substring(1);
                var ages = content.children(".summary").children("div").children().eq(0).text();
                var groupsize = content.children(".summary").children("div").children().eq(1).text();
                var campdescription = {
                    camptitle: content.children(".summary").children("div").children().eq(2).text(),
                    campsummary: content.children(".summary").children("div").children().eq(3).text().split(":")[1],
                };
                var extendedcare = content.children(".summary").children("div").children("p").eq(13).text();
                var schedulelocations = [];
                $("#content div .summary ul").each(function(i, element){
                    var location = $(this).prev().text().split("\n")[0];
                    var address =  $(this).prev().text().split("\n")[1];
                    var timearray = [];
                    $(this).children().each(function(j, el){
                        var times = $(this).text();
                        timearray.push(times);
                    })
                    var locationtimes = {
                        location: location,
                        address: address,
                        times: timearray.toString()
                    }
                    schedulelocations.push(locationtimes);
                });
                metadata = {
                    title: title,
                    price: price,
                    ages: ages,
                    groupsize: groupsize,
                    campdescription: campdescription,
                    schedulelocations: schedulelocations,
                    extendedcare: extendedcare
                    };
                results.push(metadata);
                console.log(metadata.schedulelocations.length);
                res.json(results);
                for(var i = 0; i < metadata.schedulelocations.length; i++){
                    db.reelzschooloffilm.findOrCreate({where: {title: metadata.title, $and: {address: metadata.schedulelocations[i].address}},
                        defaults: {
                        title: metadata.title,
                        price: metadata.price,
                        ages: metadata.ages,
                        groupsize: metadata.groupsize,
                        camptitle: metadata.campdescription.camptitle,
                        campsummary: metadata.campdescription.campsummary,
                        location: metadata.schedulelocations[i].location,
                        address: metadata.schedulelocations[i].address,
                        times: metadata.schedulelocations[i].times,
                        extendedcare: metadata.extendedcare,
                        }
                    })
                }
            }else{
                res.send("Use /stop-motion-lego, /filmmaking, or /utubers-unite")
            }

        });


    });

};