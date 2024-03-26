



  $(document).ready(function() {
    // game pattern
    var gamePattern = [];
    // User clicked pattern
    var userClickedPattern = [];
    // Array for colors
    var buttonColours = ["red", "blue", "green", "yellow"];
    // Game level.
    var level = 0;
  
    // Function to generate next sequence
    function nextSequence() {
      $("#level-title").text("Level " + level);
      var score;
      if (level < 10) {
        score = level + 2;
        $("#player_score").text(`Score ${score} 👀 🐓`);
        if (level === 0) {
          score = level;
          $("#player_score").text(`Score ${score} 🫂`);
        }
      } else if (level > 10 && level <= 20) {
        score = level + 4;
        $("#player_score").text(`Score ${score} 😎`);
      } else if (level > 20 && level <= 30) {
        score = level + 4;
        $("#player_score").text(`Score ${score} 🥳`);
      } else if (level > 30 && level <= 40) {
        score = level + 6;
        $("#player_score").text(`Score ${score} 👊 🍕`);
      } else if (level > 40 && level <= 50) {
        score = level + 8;
        $("#player_score").text(`Score ${score} 🔥🔥 🚒🚒🚒`);
      } else if (level > 50) {
        score = level + 10;
        $("#player_score").text(`Score ${score} 💰💰💰💰`);
      } else {
        $("#player_score").text("Out of Scores 😂😂 Next player...");
      }
  
      var randomNumber = Math.floor(Math.random() * 4);
      level++;
      var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
      animateClicked(randomChosenColour);
      return randomChosenColour;
    }
  
    // Function to animate clicked button
    function animateClicked(randomChosenColour) {
      var animateBtn = "#" + randomChosenColour;
      $(animateBtn).addClass("pressed");
      setTimeout(function() {
        $(animateBtn).removeClass("pressed");
        playSound(randomChosenColour);
      }, 170);
    }
  
    // Function to play sound
    function playSound(randomChosenColour) {
      var tone = randomChosenColour + ".mp3";
      var audio = new Audio("./sounds/" + tone);
      audio.play();
    }
  
    // Event listener for clicking a button
    $(".btn").on("click", function() {
      var userChosenColour = this.id;
      userClickedPattern.push(userChosenColour);
      animatePress(userChosenColour);
      var lastIndex = userClickedPattern.length - 1;
      checkAnswer(lastIndex);
    });
  
    // Function to animate pressed button
    function animatePress(userChosenColour) {
      var pressed_btn = "#" + userChosenColour;
      $(pressed_btn).addClass("pressed");
      setTimeout(function() {
        $(pressed_btn).removeClass("pressed");
        playSound(userChosenColour);
      }, 100);
    }
  
    // Function to check user's answer
    function checkAnswer(currentLevel) {
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
          var allMatch = true;
          for (var i = 0; i < gamePattern.length; i++) {
            if (gamePattern[i] !== userClickedPattern[i]) {
              allMatch = false;
              break;
            }
          }
          if (allMatch) {
            setTimeout(function() {
              nextSequence();
            }, 1000);
            userClickedPattern = [];
          }
        }
      } else {
        startOver();
      }
    }
  
    // Function to handle game over
    function startOver() {
      var wrong_audio = new Audio("./sounds/wrong.mp3");
      wrong_audio.play();
      $("body").css({
        background: "#d20102",
        opacity: "0.8"
      });
      setTimeout(function() {
        $("body").css({
          'background': "linear-gradient(to right, #001F3F, #003366, #004488, #0055AA, #0066CC, #0077DD, #0088FF, #001F3F)",
          "background-size": "200% 100%",
          'animation': "moveBackground 7s infinite",
          "animation-direction": "alternate",
        });
      }, 1000);
      $("#level-title").text("Game Over, Press any Key to Restart!");
      // Submit score to Realtime Database
      submitScore(level);
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
    }
  
    // Function to submit score to Realtime Database
    function submitScore(score) {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const scoreRef = db.ref('scores/' + userId);
        scoreRef.set({
          score: score
        }).then(() => {
          console.log('Score submitted successfully');
        }).catch((error) => {
          console.error('Error submitting score: ', error);
        });
      }
    }
  
    // Event listener for starting the game
    var keyEnabled = true;
    $("body").on("keydown", function(e) {
      if (keyEnabled) {
        var key = e.key;
        if (key.length === 1) {
          console.log("This is the Key " + key);
          keyEnabled = false; // disables further key presses.
          nextSequence();
        }
      }
    });
  
    // Window load event
    $(window).on('load', function() {
      setTimeout(function() {
        $("#preloader").fadeOut("slow");
      }, 4000)
    });
  
  });