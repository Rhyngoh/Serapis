function scrapingstuff(){
  $("#results").text("");
  $.getJSON("/articles", function(data){

    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page

      $("#results").prepend("<div class='panel panel-primary'><div class='panel-heading notespanel' data-id='"+data[i]._id+"'>" + data[i].title + "</div><div class='panel-body'><a href='" + data[i].link + "' target='_blank'>" + data[i].link + "</a></div></div>");
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
}
$(document).on("click", "#scrapebutton", function(){
  //$("#articles").empty();
  $.get("/scrape", function(dataall){
    console.log(dataall);

  });
  scrapingstuff();
});
