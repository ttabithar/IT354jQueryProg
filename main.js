"use strict";

$(document).ready( () => {
  // tabs widget
  $(function () {
    $("#tabs").tabs();
  });

  // save settings tab
  $("#settings").submit(event => {
    event.preventDefault()
    // get values and trim
    var playerName = $("#player_name").val().trim();
    var numOfCards = $("#num_cards").val();

    // save to session
    sessionStorage.setItem("playerName", playerName);
    sessionStorage.setItem("numOfCards", numOfCards);

    location.reload();
  });

  // display the current info
  var curName = sessionStorage.getItem("playerName");
  
  $("#playerName").text(curName);

  // display cards
 createCards();

  // matching cards
  $("#cards2").on("click", "img", function() {
    // Find the index of the clicked back card
    var index = $(this).index();
    console.log(index);
    // Find the corresponding front card by index

    $(this).fadeOut();

    $("#cards").on("click", "img", function() {
      // Find the index of the clicked back card
      var index = $(this).index();
      console.log(index);
      // Find the corresponding front card by index
    
      $(this).fadeIn();
    });
});






});
var images = []
function createCards()
{
  var curCards = sessionStorage.getItem("numOfCards");
  

  // duplicate image add twice
  for (var i = 0; i < curCards/2; i++) {
    var image = "images/card_" + (i + 1) + ".png";
    images.push(image);
    images.push(image);
  }
  shuffle(images);
    // add to container

    for (var i = 0; i < curCards; i++) {
          var card = $("<a>").attr("href", "#").attr("id", "card_" + (i+1));
          var frontImage = $("<img>").attr("src", images[i]).attr("alt", "");
          card.append(frontImage);
          $("#cards").append(card).hide();

          var card2 = $("<a>").attr("href", "#").attr("id", "back");
          var backImage = $("<img>").attr("src",  "images/back.png").attr("alt", "");
          card2.append(backImage);
          $("#cards2").append(backImage);
        }

  }

    // shuffle function
    function shuffle(images) {
      for (var i = images.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = images[i];
        images[i] = images[j];
        images[j] = temp;
      }

}

