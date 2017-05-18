var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");

module.exports = function(app) {
    app.get("/scrape/georgetown-spanish-academy", function(req, res) {
        request("https://www.georgetownspanishacademy.com/summer-camps-2017.html", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                var camptitle = $("#wsb-canvas-template-container div.wsb-element-text").eq(0).children().children("p").eq(0).text();
                var campname = $("#wsb-canvas-template-container div.wsb-element-text").eq(0).children().children("p").eq(1).text();
                var content = $("#wsb-canvas-template-container div.wsb-element-text").eq(4).children();
                var agecondition = content.children("p").eq(6).text();
                var youngercondition = content.children("p").eq(7).text();
                var languagecondition = content.children("p").eq(9).text();
                var youngestcondition = content.children("p").eq(10).text();
                var camphours = content.children("p").eq(11).text();
                var campduration = content.children("p").eq(13).text();
                var spotslimited = content.children("p").eq(14).text();
                var price = content.children("p").eq(15).text();
                var dropoffprice = content.children("p").eq(16).text();
                var contactphone = $("#wsb-canvas-template-container div.wsb-element-text").eq(1).children().children("h5").eq(1).text();
                var contactemail = $("#wsb-canvas-template-container div.wsb-element-text").eq(1).children().children("p").text();
                var weekcalendar = [];
                $("#wsb-canvas-template-container div.wsb-element-customform div.form-field-adjacent div.form-options-vertical label").data('formtype', 'checkbox').each(function(i, element){
                    var weektitle = $(this).text().split(",")[0];
                    var weekdate = $(this).text().split(",")[1];
                    var weekinfo = {
                        weektitle: weektitle,
                        weekdate: weekdate
                    }
                    weekcalendar.push(weekinfo);
                })
                metadata = {
                        camptitle: camptitle,
                        campname: campname,
                        agecondition: agecondition,
                        youngercondition: youngercondition,
                        languagecondition: languagecondition,
                        youngestcondition: youngestcondition,
                        camphours: camphours,
                        campduration: campduration,
                        spotslimited: spotslimited,
                        price: price,
                        dropoffprice: dropoffprice,
                        weekcalendar: weekcalendar,
                        contactphone: contactphone,
                        contactemail: contactemail
                    };
                results.push(metadata);
                console.log(metadata);
                res.json(results);
            }

        });


    });

};