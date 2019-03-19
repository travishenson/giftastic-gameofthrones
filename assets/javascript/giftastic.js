// Global Variables

var topics = ['Jon Snow', 'Dragons', 'Tyrion Lannister', 'Valar Morghulis', 'White Walkers'];

// Populate Buttons Function

var initialButtons = function () {
  for (var i = 0; i < topics.length; i++) {
    var newButton = $('<button>').attr('id', topics[i]).html(topics[i]).addClass('gifButton');
    $('#buttonContainer').append(newButton);
  }
}

initialButtons();

// Add GIFs on Button Click

$('.gifButton').on('click', function () {

  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + this.id.replace(/\s/g, '-') + '&api_key=wnF5o6kaFkZK4yMVIe4bJPlY1IZpPE5w&limit=10';

  console.log(queryURL);
  

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    var allGIFs = $('<div>');

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>").css({
        'display': 'inline-block',
        'margin': '5px',
      });

      var rating = results[i].rating.toUpperCase();

      var p = $("<p>").text("Rating: " + rating);

      var gotGIF = $("<img>");
      gotGIF.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(gotGIF);

      $(allGIFs).prepend(gifDiv);

      $('#gifsContainer').html(allGIFs);
    }

  });

});

// Add New Button Function

$('#submit').on('click', function () {
  var newID = $('#newInput').val();
  var userButton = $('<button>').attr('id', newID).html(newID).addClass('gifButton');
  $('#buttonContainer').append(userButton);
});