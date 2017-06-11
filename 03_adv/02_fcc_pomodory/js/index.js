var Clock = function(minutesCycle) {
    // Initialize state
    this.pomCycle = minutesCycle * 60;
		this.current = this.pomCycle;
		this.state = 0;
	
		

		// Get document parts
		this.timeDisplay = document.getElementById('time-display');
		this.startButton = document.getElementById('start-button');
		this.pauseButton = document.getElementById('pause-button');
		this.upButton = document.getElementById('up-button');
		this.downButton = document.getElementById('down-button');
		this.resetButton = document.getElementById('reset-button');
		
		// Initialize display
		this.timeDisplay.innerHTML = 
Math.floor(this.pomCycle/60) + ":00";
	
		// Setters and getters and updates
		this.setPomCycle = function(minutes) {
		this.pomCycle = minutes*60;
		this.timeDisplay.innerHTML = this.pomCycle;
		}
		
		
		this.upDateDisplay = function(seconds) {
		if (seconds%60 == 0) {
			this.timeDisplay.innerHTML = Math.floor(seconds/60) + ":00";
		} else {
		this.timeDisplay.innerHTML = Math.floor(seconds/60) + ":" + seconds%60;
			}
		}
		
		
};
/////////////////////////////

var clock = new Clock(25);

// Functions
/*
var start = function() {
	if (clock.state==0) {
	clock.state = 1;
 	intervalID = setInterval(function() {
		clock.current -=1;
		clock.upDateDisplay(clock.current);
	} ,1000); 
	} else {		
	}
}
*/
var start = function() {
	if (clock.state==0) {
	clock.state = 1;
 	intervalID = setInterval(function() {
		if(clock.current>0) {
			clock.current -=1;
			clock.upDateDisplay(clock.current);
		} else {
			clearInterval(intervalID);
			clock.timeDisplay.innerHTML = '0:00 End of Cycle!!!'
			var audio = new Audio('https://www.freespecialeffects.co.uk/soundfx/sirens/alarm_01.wav');
audio.play();
		}
	}, 1000); 
	}
}



var pause = function() {
 	clearInterval(intervalID);
	clock.state = 0;
}

var reset = function() {
 	clearInterval(intervalID);
	clock.state = 0;
	clock.setPomCycle(clock.pomCycle/60);
	clock.current = clock.pomCycle;
	clock.upDateDisplay(clock.current);
}


var upPomCycle = function() {
	//clock.pomCycle += 60;
	clock.setPomCycle(clock.pomCycle/60+1);
	clock.current = clock.pomCycle;
	clock.upDateDisplay(clock.current);
}

var downPomCycle = function() {
	//clock.pomCycle += 60;
	clock.setPomCycle(clock.pomCycle/60-1);
	clock.current = clock.pomCycle;
	clock.upDateDisplay(clock.current);
}

//event listeners for instance
clock.startButton.addEventListener("click", function() {start();});	

clock.pauseButton.addEventListener("click", function() {pause();});	

clock.resetButton.addEventListener("click", function() {reset();});	

clock.upButton.addEventListener("click", function() {upPomCycle();});	

clock.downButton.addEventListener("click", function() {downPomCycle();});	


//clock.setPomCycle(5);