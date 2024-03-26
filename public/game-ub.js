// game pattern
var gamePattern = [];
// User clicked pattern
var userClickedPattern = [];
//array for colors
buttonColours = ["red", "blue", "green", "yellow"];
// game level.
var level = 0;
//generate random number function.
function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  // return randomNumber;
  console.log("The game is at level " + level);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  console.log("This is the pattern " + gamePattern);
  animateClicked(randomChosenColour);
  playSound(randomChosenColour);
  return randomChosenColour;
}

//animating the buttons function. 
function animateClicked(randomChosenColour){
  var animateBtn = "#" + randomChosenColour;
  console.log("This is the animateBtn " + animateBtn);
  $(animateBtn).addClass("pressed");
  setTimeout(function () {
  $(animateBtn).removeClass("pressed");
  playSound(randomChosenColour);
}, 150);
}


//playing sounds function.
function playSound(randomChosenColour,userChosenColour) {
  // playing audio when site loads
  var tone = randomChosenColour + ".mp3";
  var audio = new Audio("./sounds/" + tone);
  audio.play();
  //playing sound when user clicks
  var clicked_audio = new Audio("./sounds/" + userChosenColour + ".mp3");
  clicked_audio.play();
}

//making sounds
// var tone = randomChosenColour + '.mp3';
// var audio = new Audio('./sounds/'+tone);
// audio.play();

// when user clicks a button.
$(".btn").on("click", function () {
  var userChosenColour = this.id;
  // console.log("This is the id of the btn "+ userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern); // logs colors selected.
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

// animated pressed function.
function animatePress(currentColor) {
  var pressed_btn = "#" + currentColor;
  $(pressed_btn).addClass("pressed");
  setTimeout(function () {
    $(pressed_btn).removeClass("pressed");
  }, 100);
}

//!Starting the game.
var keyEnabled = true;
$("body").on("keydown", function (e) {
  if(keyEnabled){
    var key = e.key;
    if (key.length ===1) {
      $("h1").text("Level 0");
      console.log("This is the Key " + key);
      keyEnabled = false; // disables further key presses.
      nextSequence();
    }
  } 
});
