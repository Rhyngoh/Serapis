var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {
    app.get("/scrape/4-reelz-school-of-film/:camp", function(req, res) {
        var querystring = "http://www.4reelzschooloffilm.com/courses/summer-camp-" + req.params.camp;
        request(querystring, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var content = $("#content div");
                var image = content.children(".images").children().eq(0).attr("href");
                var title = content.children(".summary").children("h1").text();
                var price = content.children(".summary").children("div").eq(0).children(".price").text().substring(1);
                var ages = content.children(".summary").children("div").eq(1).children("p").eq(0).text();
                var groupsize = content.children(".summary").children("div").eq(1).children("p").eq(1).text();
                var campdescription = {
                    camptitle: content.children(".summary").children("div").eq(1).children("p").eq(2).text(),
                    campsummary: content.children(".summary").children("div").eq(1).children("p").eq(3).text().split(":")[1],
                };
                var extendedcare = content.children(".summary").children("div").eq(1).children("p").eq(13).text();
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
                        times: timearray
                    }
                    schedulelocations.push(locationtimes);
                });
                metadata = {
                    image: image,
                    title: title,
                    price: price,
                    ages: ages,
                    groupsize: groupsize,
                    campdescription: campdescription,
                    schedulelocations: schedulelocations,
                    extendedcare: extendedcare
                    };
                results.push(metadata);
                console.log(metadata);
                res.json(results);
            }else{
                res.send("Use /stop-motion-lego, /filmmaking, or /utubers-unite")
            }

        });


    });

};