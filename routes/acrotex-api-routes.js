var request = require('request');
var cheerio = require('cheerio');
var connection = require("../config/connection.js");
var phantom = require('phantom');

module.exports = function(app) {
    app.get("/scrape/acrotex", function(req, res) {
        phantom.create().then(function(ph) {
          ph.createPage().then(function(page) {
            page.open('http://www.acrotex.com/round-rock-gym/camps/').then(function(status) {
                page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function(){
                    page.evaluate(function(){
                        var data = {};

                        $("td").each(function(i, element){
                            var title = $(this).text();
                            console.log(title);
                            res.json(title);
                        });
                    });
                page.close();
                ph.exit();
                });
              /*console.log(status);
              page.property('content').then(function(content) {
                console.log(content);*/
            });
          });
        });
    });
};
