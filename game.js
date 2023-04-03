var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];

var userClickedPattern=[];

var level=0;
var gameStart=false;
$(document).keypress(function() {
    if(!gameStart) {
        gameStart=true;
        $("#level-title").html("Level "+level);
        nextSequence();
    }
});


$(".btn").on("click",function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver() {
    level=0;
    gamePattern=[];
    gameStart=false;
}

function playSound(name) {
    var audioFile="sounds/"+name+".mp3";
    var audio=new Audio(audioFile);
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

