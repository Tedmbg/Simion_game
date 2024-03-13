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
  $("h1").text("Level " + level);
  var score;
  if (level < 10) {
    score = level + 2;
    $("#player_score").text(`Score ${score} 👀 🐓`);
    if (level === 0) {
      score = level;
      $("#player_score").text(`Score ${score} 🫂`);
    }
  } else if (level > 10) {
    score = level + 4;
    $("#player_score").text(`Score ${score} 😎`);
  } else if (level > 20) {
    score = level + 4;
    $("#player_score").text(`Score ${score} 🥳`);
  } else if (level > 30) {
    score = level + 6;
    $("#player_score").text(`Score ${score} 👊 🍕`);
  }else if(level>40){
    score = level + 8;
    $("#player_score").text(`Score ${score} 🔥🔥 🚒🚒🚒`);
  }else if(level>50){
    score = level + 10;
    $("#player_score").text(`Score ${score} 💰💰💰💰`);
  }else if(level>50){
    score = level + 10;
    $("#player_score").text('Out of Scores 😂😂 Next player...');
  }


  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  // return randomNumber btw 0-3;
  console.log("The game is at level " + level);
  level++;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomChosenColour);
  // console.log("This is the pattern " + gamePattern);
  animateClicked(randomChosenColour);
  // playSound(randomChosenColour);
  return randomChosenColour;
}

//animating the buttons for random number function.
function animateClicked(randomChosenColour) {
  var animateBtn = "#" + randomChosenColour;
  console.log("This is the animateBtn " + animateBtn);
  $(animateBtn).addClass("pressed");
  setTimeout(function () {
    $(animateBtn).removeClass("pressed");
    playSound(randomChosenColour);
  }, 170);
}

//playing sounds function.
function playSound(randomChosenColour) {
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
  animatePress(userChosenColour);
  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
});

// animated pressed function when user presses button.
function animatePress(userChosenColour) {
  var pressed_btn = "#" + userChosenColour;
  $(pressed_btn).addClass("pressed");
  setTimeout(function () {
    $(pressed_btn).removeClass("pressed");
    playSound(userChosenColour);
  }, 100);
}

//!Starting the game.
var keyEnabled = true;
$("body").on("keydown", function (e) {
  if (keyEnabled) {
    var key = e.key;
    if (key.length === 1) {
      console.log("This is the Key " + key);
      keyEnabled = false; // disables further key presses.
      nextSequence();
    }
  }
});

//Game logic checking users ans.

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      var allMatch = true;
      for (var i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
          allMatch = false;
          break;
        }
      }
      if (allMatch) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
        userClickedPattern = [];
      }
    }
  } else {
    startOver();
  }
}
function startOver() {
  var wrong_audio = new Audio("./sounds/wrong.mp3");
  wrong_audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press any Key to Restart!");
  keyEnabled = true;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  // console.log("Wrong!");
}
