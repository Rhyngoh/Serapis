var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");
var db = require('../models');
var bodyparser = require('body-parser');
module.exports = function(app) {
    app.use(bodyparser.json());

    app.get("/scrape/austin-village-academy", function(req, res) {
        request("http://www.austinvillageacademy.org/camps-summer-2016/", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var results = [];
                $("div.entry-content h3 a").each(function(i, element) {
                    var link = $(this).attr("href");
                    var name = $(this).text();
                    var date = $(this).parent().next().text().split(", ")[0];
                    var age = $(this).parent().next().text().split(", ")[1];
                    var rate = $(this).parent().next().text().split(", ")[2];
                    var description = $(this).parent().next().next().text();
                    var others = $(this).parent().next().next().next().text();
                    metadata = {
                        link: link,
                        name: name,
                        date: date,
                        age: age,
                        rate: rate,
                        description: description,
                        others: others
                    };
                    results.push(metadata);
                    console.log(metadata);
                });
                res.json(results);
                for(var i = 0; i < results.length; i ++){
                    db.austinvillageacademy.findOrCreate({where: {link: results[i].link},
                        defaults: {
                            link: results[i].link,
                            name: results[i].name,
                            date: results[i].date,
                            age: results[i].age,
                            rate: results[i].rate,
                            description: results[i].description,
                            others: results[i].others
                        }
                    })
                }
            }

        });


    });

};