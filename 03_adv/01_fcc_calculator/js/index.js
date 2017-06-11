//Set variables
var current = '';
var prevCall = '';
var loopVals = '0123456789./*-+'.split('');
/////
var output = document.getElementById("output");

var outputFull = document.getElementById("output-full");


function addOperation(clicked_id) {
  output.innerHTML = clicked_id;
  current += clicked_id;
  outputFull.innerHTML = "Full Operation in Mem:" + current;
  console.log(current);
  }

function evaluateAll() {
  var results = eval(current)
  output.innerHTML = results;
  current = results;
  }

function clearAll() {
  output.innerHTML = 0;
  current = '';
  outputFull.innerHTML = "Full Operation in Mem: 0"
  }