"use strict";
var index = 0;
var matchCount = 0;
var tryCount = 0;

$(document).ready(() => {
  // tabs widget
  $(function () {
    $("#tabs").tabs();
  });
  // display cards
  createCards();
  // save settings tab
  $("#settings").submit(event => {
    event.preventDefault()
    // get values and trim values
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
  var score2 = sessionStorage.getItem("score");
  if (sessionStorage.getItem("score") != -1)
  {
    $("#high_score2").text(sessionStorage.getItem("score") * 100 + "%");
  }

  // flip a card
  var index2 = -1;
  var image = null;
  var counter = 0;

  $("#cards").on("click", "img", function () {

    index = $(this).index(); // index of clicked image

    // create new image element and replace the original
    image = $("<img>").attr("src", images[index]).attr("alt", "");
    $("#cards img").eq(index).fadeIn().replaceWith(image);

    setTimeout(() => {
      // match cards
      if (counter == 1) // we have 2 selected cards
      {
        if (images[index] == images[index2]) // match
        {
          matchCount++;
          tryCount++;
          var blank = $("<img>").attr("src", "images/blank.png").attr("alt", "");
          $("#cards img").eq(index).fadeIn().replaceWith(blank);
          var blank2 = $("<img>").attr("src", "images/blank.png").attr("alt", "");
          $("#cards img").eq(index2).fadeIn().replaceWith(blank2);
          index2 = -1;
        }
        else { // no match
          tryCount++;
          var back = $("<img>").attr("src", "images/back.png").attr("alt", "");
          $("#cards img").eq(index).fadeIn().replaceWith(back);
          var back2 = $("<img>").attr("src", "images/back.png").attr("alt", "");
          $("#cards img").eq(index2).fadeIn().replaceWith(back2);
          index2 = null
        }
        counter = 0; // reset
      }
      else {
        counter++;
        index2 = index;
      }

      if (matchCount == (sessionStorage.getItem("numOfCards") / 2)) {
        // show finished score
        $("#correct2").text((matchCount / tryCount).toFixed(2) * 100 + "%");
        $("#score2").text(tryCount);
        // save to session if better than previous
        if ((matchCount/tryCount) >= (sessionStorage.getItem("score") || -1)) {
          sessionStorage.setItem("score", (matchCount/tryCount));
          $("#high_score2").text((matchCount / tryCount).toFixed(2) * 100 + "%");
        }
      }
    }, 200);

  });

});

var images = [] // global 
function createCards() {
  var curCards = sessionStorage.getItem("numOfCards") || 48;

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

