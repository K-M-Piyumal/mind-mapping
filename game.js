var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var i = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour); 
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var scolor = 'sounds/' + name +'.mp3';
    var sound = new Audio(scolor);
    sound.play();
}

function animatePress(currentColour){
    document.querySelector('.' + currentColour).classList.add("pressed");
    setTimeout(function(){
        document.querySelector('.'+currentColour).classList.remove("pressed");
    },100);
}
var toggle_key = true;

$("body").keypress(function(){
    if(toggle_key == true){
        $("#level-title").text("Level 0");
        nextSequence();
        toggle_key = false;
    }
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        if(gamePattern.length === userClickedPattern.length){
            console.log("Daaa");
            ++i;
            $("#level-title").text("Level "+ i);
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }else{
        var sound = new Audio('sounds/wrong.mp3');
        sound.play();
        document.querySelector('body').classList.add("game-over");
        setTimeout(function(){
            document.querySelector('body').classList.remove("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").keypress(function(){
           window.location.reload();
        });

    }

}




