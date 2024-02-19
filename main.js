"use strict";

$(document).ready(() => {
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

  // flip a card
  var index2 = -1;
  var image = null;
  var counter = 0;
  $("#cards").on("click", "img", function () {

    var index = $(this).index(); // index of clicked image
    $(this).fadeOut();

    // create new image element and replace the original
    image = $("<img>").attr("src", images[index]).attr("alt", "");
    $("#cards img").eq(index).fadeIn().replaceWith(image);

    setTimeout(() => {
      // match cards
      console.log("he");
      if (counter == 1) // we have 2 selected cards
      {
        console.log("here");
        if (images[index] == images[index2]) // match
        { 
          console.log("match");
          var blank = $("<img>").attr("src", "/images/blank.png").attr("alt", "");
          $("#cards img").eq(index).fadeIn().replaceWith(blank);
          $("#cards img").eq(index2).fadeIn().replaceWith(blank);
        }
        else { // no match
          console.log("no match");
          var back = $("<img>").attr("src", "/images/back.png").attr("alt", "");
          $("#cards img").eq(index).fadeIn().replaceWith(back);
          $("#cards img").eq(index2).fadeIn().replaceWith(back);
        }
        counter = 0; // reset
        index2 = -1;
      }
      else {
        counter++;
        index2 = index;
        console.log("hello");
      }
    }, 500);

  });

});

var images = [] // global 
function createCards() {
  var curCards = sessionStorage.getItem("numOfCards");

  // duplicate image add twice
  for (var i = 0; i < curCards / 2; i++) {
    var image = "images/card_" + (i + 1) + ".png";
    images.push(image);
    images.push(image);
  }
  shuffle(images);
  // add to container
  for (var i = 0; i < curCards; i++) {
    var card = $("<a>").attr("href", "#").attr("id", "back");
    var backImage = $("<img>").attr("src", "images/back.png").attr("alt", "");
    card.append(backImage);
    $("#cards").append(backImage);
  }
}

// shuffle function for images array
function shuffle(images) {
  for (var i = images.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }

}

