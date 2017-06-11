
function SimonGame(gameLength) {
    this.gameLength = gameLength;
    this.isStrictMode = false;
    this.currentStep = 0;
    this.soundArray = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];
    this.userInpArr = [];  
    this.ansArray = [];
    for (var i=0; i<gameLength; i++) {
      this.ansArray.push(Math.floor((Math.random() * 4) ));
    }
    
}

/*
SimonGame.prototype.clickPlayButton = function(index) {
  //document.getElementById("button" + index).style.color = "blue";
  var audio = new Audio(this.soundArray[index]);
  audio.play();
};
*/


SimonGame.prototype.playButton = function(index) {
  document.getElementById("button" + index).style.color = "red";
  var audio = new Audio(this.soundArray[index]);
  audio.play();
  setTimeout(function() {
          document.getElementById("button" + index).style.color = "white"; 
      }, 1000);
};


SimonGame.prototype.playAns = function(lastIndex) {
    var self = this;
    function customLoop(i) {
    self.playButton(self.ansArray[i]);
    i++;
    if (i<lastIndex) {setTimeout(function(){customLoop(i);},1700);}
}
    customLoop(0);
};


SimonGame.prototype.incrementOneRound = function() {
  this.currentStep++;
  this.userInpArr = [];
};

SimonGame.prototype.resetAns = function() {
  this.userInpArr = [];
};

SimonGame.prototype.resetGame = function() {
    this.currentStep = 0;
    this.userInpArr = [];  
    this.ansArray = [];
    for (var i=0; i<this.gameLength; i++) {
      this.ansArray.push(Math.floor((Math.random() * 4) ));
    }
};



//////////////////
//Set DOM elements and some functions/listeners 
var computerTurn = "Listen, remember and copy";
var playerTurn = "Copy sequence";


var curStepDisp = document.getElementById('current-step');

var playerInfoDisp = document.getElementById('player-info');
//playerInfoDisp.innerHTML = computerTurn;



var restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', function() {
  //console.log("Restarting with new sequence");
  playerInfoDisp.innerHTML = "Restarting with new sequence";
  game.resetGame();
  curStepDisp.innerHTML = "Current step: "+(game.currentStep+1)+"/20";
  //game.currentStep+1;
  setTimeout(function(){
  game.playAns(1);
  setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1000);
    },2000);
  
  
  //game.playAns(1);
});


var strictButton = document.getElementById('strict-button');
strictButton.addEventListener('click', function() {
  if (game.isStrictMode == false) {
    console.log("Strict Mode ON");
    game.isStrictMode = true;
    //ADD STYLING
    document.getElementById("strict-button").style.color = "red";
  } else {
    console.log("Strict Mode OFF");
    game.isStrictMode = false;
    //REMOVE STYLING
    document.getElementById("strict-button").style.color = "white";
  }
});



var soundButton0 = document.getElementById('button0');
var soundButton1 = document.getElementById('button1');
var soundButton2 = document.getElementById('button2');
var soundButton3 = document.getElementById('button3');

//////////////////////
//MAIN PLAY FNC
var oneRound = function(self) {
  //add whatever input to answer array
  game.userInpArr.push(self.value);
  //check if end of input and end of game
  if (game.gameLength==game.userInpArr.length
     &&
     self.value == game.ansArray[game.currentStep]) {
    //console.log("FINISHED GAME, starting over");
    playerInfoDisp.innerHTML = "FINISHED GAME, starting over";
    setTimeout(function(){
      game.resetGame();
      curStepDisp.innerHTML = "Current step: "+(game.currentStep+1)+"/20";//game.currentStep+1;
      playerInfoDisp.innerHTML = computerTurn;
      game.playAns(1);
      setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1000);
    },2000);
  
  } else
  //check if last input is end of round, then increment
  if (game.userInpArr.length-1 == game.currentStep
      &&
      self.value == game.ansArray[game.currentStep]) {
    //console.log("ALL CORRECT, one more step");
    playerInfoDisp.innerHTML = computerTurn;
    game.incrementOneRound();
    curStepDisp.innerHTML = "Current step: "+(game.currentStep+1)+"/20";//game.currentStep+1;
    setTimeout(function(){
      game.playAns(game.currentStep+1);
      setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1800*(game.currentStep+1));
    },2000);
    //game.playAns(game.currentStep+1);    
    
  } else if (game.userInpArr[game.userInpArr.length-1] == game.ansArray[game.userInpArr.length-1]) {
    //check if input is the same as the one in the answer
    playerInfoDisp.innerHTML = "Correct, now the next one";
  } else if (game.isStrictMode == false) {
    //Log error and replay from beginning
    //console.log("wrong, playing again, concentrate this time around");
    playerInfoDisp.innerHTML = "Wrong input! Playing again...";
    game.resetAns();
    setTimeout(function(){
      game.playAns(game.currentStep+1);
      //setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1000);
    setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1800*(game.currentStep+1));  
      
    },2000);
    //game.playAns(game.currentStep+1);
  } else if (game.isStrictMode == true) {
    //console.log("Restarting with new sequence");
    playerInfoDisp.innerHTML = "Strict mode on, restarting..."
    game.resetGame();
    curStepDisp.innerHTML = "Current step: "+(game.currentStep+1)+"/20";//game.currentStep+1;
    //game.playAns(1);
    setTimeout(function(){
      game.playAns(1);
      setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1000);
    },2000);
             }
}

soundButton0.addEventListener('click', function() {
  game.playButton(0);
  var self = this;
  oneRound(self);
});
soundButton1.addEventListener('click', function() {
  game.playButton(1);
  var self = this;
  oneRound(self);
});
soundButton2.addEventListener('click', function() {
  game.playButton(2);
  var self = this;
  oneRound(self);
});
soundButton3.addEventListener('click', function() {
  game.playButton(3);
  var self = this;
  oneRound(self);
});




//////////////////
//INITIATE INSTANCE
var game = new SimonGame(20); 
console.log(game.ansArray);
curStepDisp.innerHTML = "Current step: "+(game.currentStep+1)+"/20";
playerInfoDisp.innerHTML = computerTurn;
setTimeout(function(){
  game.playAns(1);
  setTimeout(function(){playerInfoDisp.innerHTML = playerTurn;},1000);
    },2000);
//game.playAns(1);