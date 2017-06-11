
//////////////////////////////////////////


function Game(myMarker, botMarker, state) {
    this.myMarker = myMarker;
    this.botMarker = botMarker;
    this.state = state;
    this.board = [0,0,0,0,0,0,0,0,0];
    this.myBoard = [0,0,0,0,0,0,0,0,0];
    this.botBoard = [0,0,0,0,0,0,0,0,0];
}

//reset

Game.prototype.checkWin = function() {
  var boardToCheck = (this.state == "you" ? this.myBoard : this.botBoard);
  
  if (boardToCheck.slice(0,3).every(function(el) {return el == 1;}) ||
 boardToCheck.slice(3,6).every(function(el) {return el == 1;}) ||
 boardToCheck.slice(6,9).every(function(el) {return el == 1;}) ||
 [boardToCheck[0],boardToCheck[3],boardToCheck[6]].every(function(el) {return el == 1;}) ||
 [boardToCheck[1],boardToCheck[4],boardToCheck[7]].every(function(el) {return el == 1;}) ||
 [boardToCheck[2],boardToCheck[5],boardToCheck[8]].every(function(el) {return el == 1;}) ||
 [boardToCheck[0],boardToCheck[4],boardToCheck[8]].every(function(el) {return el == 1;}) ||
[boardToCheck[6],boardToCheck[4],boardToCheck[2]].every(function(el) {return el == 1;})      
     ) {
      document.getElementById("player-turn").innerHTML = this.state +" won. Resetting game..."
      setTimeout(function() {
        game.reset();
      }, 1500);
      };
  
 
  //console.log("right col",[boardToCheck[2],boardToCheck[5],boardToCheck[8]]);
  //console.log("down diag",[boardToCheck[0],boardToCheck[4],boardToCheck[8]]);
  //console.log("up diag",[boardToCheck[6],boardToCheck[4],boardToCheck[2]]);

  
  //console.log(boardToCheck.slice(0,3).every(function(el) {return el == 1;}));
  //console.log(boardToCheck.slice(3,6).every(function(el) {return el == 1;}));
  //console.log(boardToCheck.slice(6,9).every(function(el) {return el == 1;}));
};


//MARK WINNER!!! + RESTART AUTO

Game.prototype.checkFull = function() {
  if(this.board.every(function(el) {return el == 1;})) {
    //this.state = "end"
    game.reset();
    document.getElementById("player-turn").innerHTML = "Draw - All slots taken, Resetting game..."
    setTimeout(function() {
      //game.reset(); //moved up to avoid bug
      document.getElementById("player-turn").innerHTML = "Current player: you \("+game.myMarker+"\)"
    }, 1500);
      
  }
};


Game.prototype.reset = function() {
    this.board = [0,0,0,0,0,0,0,0,0];
    this.myBoard = [0,0,0,0,0,0,0,0,0];
    this.botBoard = [0,0,0,0,0,0,0,0,0];
    for (var i=0; i<boardDivs.length; i++) {
      boardDivs[i].innerHTML = "";
    }
    if (this.state = "you") {
      document.getElementById("player-turn").innerHTML = "Current player: you \("+game.myMarker+"\)";
        }
};



Game.prototype.setMarker = function(index, outputDispId) {
    //console.log(this.board[index]);
    if(this.board[index] == 0) {
      this.state = "you";
      this.board[index] = 1;
      this.myBoard[index] = 1;
      document.getElementById("player-turn").innerHTML = "Current player: bot \("+game.botMarker+"\)";
      //console.log(this.board);
    } 
  /*else {      
 document.getElementById(outputDispId).innerHTML = "already taken, choose another";
      setTimeout(function() {
 document.getElementById(outputDispId).innerHTML = "";
      }, 1000);
    }*/
};

//Game.prototype.getBoard = function() {
    //console.log(this.board);
//    return this.board;
//};


Game.prototype.botTurn = function() {
  var takenIndicator = true;
  while(takenIndicator) {
    var choice = Math.floor((Math.random() * 9) + 1);
    if(this.board[choice]==0) {
      this.state = "bot";
      this.board[choice] = 1;
      this.botBoard[choice] = 1;
      boardDivs[choice].innerHTML = game.botMarker;
      document.getElementById("player-turn").innerHTML = "Current player: you \("+game.myMarker+"\)";
      //console.log("if",this.board);
      takenIndicator = false;
    }
    //console.log("next",this.board);
  }
};



var game = new Game("x","o", "player");
document.getElementById("player-turn").innerHTML = "Current player: you (x)";


var xButton = document.getElementById('x-button');
var oButton = document.getElementById('o-button');

xButton.addEventListener('click', function() {
    game.myMarker = "x";
    game.botMarker = "o";
    //document.getElementById("player-turn").innerHTML = "Current player: you \("+game.myMarker+"\)";
  game.reset();
  });

oButton.addEventListener('click', function() {
    game.myMarker = "o";
    game.botMarker = "x";
    //document.getElementById("player-turn").innerHTML = "Current player: you \("+game.myMarker+"\)";
  game.reset();
  });


//game.botTurn();
//game.botTurn();
//game.botTurn();
//game.botTurn();


var boardDivs = document.getElementsByClassName('board-fields');
//console.log(boardDivs);

for (var i = 0; i < game.board.length; i++) {
  boardDivs[i].addEventListener('click', function() {
 
 if (game.board[this.getAttribute('value')] == 0) {
      this.innerHTML = game.myMarker;
      game.setMarker(this.getAttribute('value'), "info");
 
 game.checkWin();
 game.checkFull();
   
   setTimeout(function() {
     //console.log("before",game.board);
     game.botTurn();
     //console.log("after",game.board);
     game.checkWin();
     game.checkFull();
   }, 1500);

 
    } else {      
 document.getElementById("info").innerHTML = "already taken, choose another";
      setTimeout(function() {
 document.getElementById("info").innerHTML = "";
      }, 1000);
    }  
       
    
        
    //game.checkWin();
    
    
  });
}