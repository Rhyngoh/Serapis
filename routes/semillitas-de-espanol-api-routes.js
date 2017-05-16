var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {


    app.get("/scrape/semillitas-de-espanol", function(req, res) {
        request("http://semillitasespanol.com/vlt64469.htm", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var title = $("#pageContent .page-body p").eq(0).text();
                var canta = $("#pageContent .page-body table tbody tr").eq(1).children().eq(0);
                var program1 = canta.text();
                var duration1 = canta.next().text();
                var firstchild1 = canta.next().next().text();
                var secondchild1 = canta.next().next().next().text();
                var thirdchild1 = canta.next().next().next().next().text();
                var youngersiblings1 = canta.next().next().next().next().next().text();
                var arte = $("#pageContent .page-body table tbody tr").eq(2).children().eq(0);
                var program2 = arte.text();
                var duration2 = arte.next().text();
                var firstchild2 = arte.next().next().text();
                var secondchild2 = arte.next().next().next().text();
                var thirdchild2 = arte.next().next().next().next().text();
                var youngersiblings2 = arte.next().next().next().next().next().text();
                var grande = $("#pageContent .page-body table tbody tr").eq(3).children().eq(0);
                var program3 = grande.text();
                var duration3 = grande.next().text();
                var firstchild3 = grande.next().next().text();
                var secondchild3 = grande.next().next().next().text();
                var thirdchild3 = grande.next().next().next().next().text();
                var youngersiblings3 = grande.next().next().next().next().next().text();
                var sidenote1 = $("#pageContent .page-body p").eq(4).text();
                var sidenote2 = $("#pageContent .page-body p").eq(5).text();
                var sidenote3 = $("#pageContent .page-body p").eq(6).text();
                var materials = $("#pageContent .page-body p").eq(9).text();
                var cantamaterials = materials.split(". ")[0];
                var artematerials = materials.split(". ")[1];
                var grandematerials = materials.split(". ")[2];
                var cancellation = $("#pageContent .page-body p").eq(12).text();
                var location = $(".fboxes .fbox-left .fbox-internal blockquote").children().eq(0).text() + " " + $(".fboxes .fbox-left .fbox-internal blockquote").children().eq(1).text();
                metadata = {
                    canta : {
                        title: title,
                        program: program1,
                        duration: duration1,
                        firstchild: firstchild1,
                        secondchild: secondchild1,
                        thirdchild: thirdchild1,
                        youngersiblings: youngersiblings1,
                        sidenotes: {
                            sidenote1: sidenote1,
                            sidenote2: sidenote2,
                            sidenote3: sidenote3
                        },
                        materials: cantamaterials,
                        cancellation: cancellation,
                        location: location
                    },
                    arte : {
                        title: title,
                        program: program2,
                        duration: duration2,
                        firstchild: firstchild2,
                        secondchild: secondchild2,
                        thirdchild: thirdchild2,
                        youngersiblings: youngersiblings2,
                        sidenotes: {
                            sidenote1: sidenote1,
                            sidenote2: sidenote2,
                            sidenote3: sidenote3
                        },
                        materials: artematerials,
                        cancellation: cancellation,
                        location: location
                    },
                    artegrande : {
                        title: title,
                        program: program3,
                        duration: duration3,
                        firstchild: firstchild3,
                        secondchild: secondchild3,
                        thirdchild: thirdchild3,
                        youngersiblings: youngersiblings3,
                        sidenotes: {
                            sidenote1: sidenote1,
                            sidenote2: sidenote2,
                            sidenote3: sidenote3
                        },
                        materials: grandematerials,
                        cancellation: cancellation,
                        location: location
                    }
                };
                results.push(metadata);
                console.log(metadata);
                res.json(results);
            }

        });


    });

};