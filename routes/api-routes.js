var db = require("../models");

module.exports = function(app) {
  app.get("/scrape",function(req,res){
      res.send("Scrape Camp Eagle using /scrape/campeagle");
  });

  app.get("/scrape/campeagle", function(req, res) {
  request("https://campeagle.org/summer/adventure-for-the-city.php", function(error, response, html) {
    if(!error && response.statusCode == 200){
      var $ = cheerio.load(html);
    $("table.headwaters tbody tr td.bold").each(function(i, element) {
      var rate = $(this).prev().text();
      var date = $(this).prev().prev().text();
      var session = $(this).prev().prev().prev().text();
      // Save the text of each link enclosed in the current element
      var title = $(this).children("a").text();
      // Save the href value of each link enclosed in the current element
      var link = $(this).children("a").attr("href");
      var metadata = {
        session: session,
        date: date,
        rate: rate,
        title: title,
        link: link
      };
      console.log(metadata);
    });
  }
  });

  res.send("Scrape Complete");
});

};