/* d3.csv("example_tossups.csv").then(function(data) {
  console.log(data[0]);
});
 */
function randomEvenNumber(maxnum) {
	var min = 0;
	var max = maxnum/2;
	//console.log("MIN: " + min);
	//console.log("MAX: " + max);
    return 2*(Math.floor(Math.random() * (max - min)) + min);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEven(min, max) {
	var x = getRandomInt(min, max);
	if(x % 2 == 0){
		return x;
	}else{
		return randomEven(min, max);
	}
}

var STATE_READING = 0;
var STATE_FINISHED = 1;
var STATE_ANSWER_REVEALED = 2;

var state = 0;

var lines = new Array;
$.get('https://asfduahoufi.github.io/example_tossups.csv', function(data){
		lines = data.split('\n');
		//console.log(lines);
	});

var tossups = [];
var length = lines.length;
for(var i = 0; i < length; i+=2){
	var question = lines[i];
	var answer = lines[i+1];
	var tossup = [question, answer];
	tossups.push(tossup);
}
//console.log(tossups)
	
var showText = function (target, message, index, interval) {    
	if (index < message.length && state === STATE_READING) { 
		$(target).append(message[index++]); 
		setTimeout(function () { showText(target, message, index, interval); }, interval); 
	}else{
		//console.log("showText Finished")
		state = STATE_FINISHED;
		$(target).text(message);
	}
}

var lineNumber = 0;

state = STATE_READING;
$("#question").text("");
$("#answer").text("");
$(function () { 
	showText("#question", lines[lineNumber], 0, 125);    
}); 

$(window).keypress(function(e) {
    if (e.which === 32) {
		//console.log("SPACE")
		if(state === STATE_READING){
			//console.log("STATE_READING --> STATE_FINISHED")
			state = STATE_FINISHED;
		}else if(state === STATE_FINISHED){
			lineNumber++;
			$("#question").text(lines[lineNumber-1] + "\r\n ANSWER: " + lines[lineNumber]);
			//$("#answer").append("\n" + lines[lineNumber]);
			//console.log("STATE_FINISHED --> STATE_ANSWER_REVEALED")
			//console.log(lines[lineNumber]);
			state = STATE_ANSWER_REVEALED;
		}else{
			//console.log("STATE_ANSWER_REVEALED --> STATE_READING")
			//lineNumber++;
			lineNumber = randomEven(0, lines.length-1);
			console.log(lineNumber);
			state = STATE_READING;
			$("#question").text("");
			$("#answer").text("");
			$(function () { 
				showText("#question", lines[lineNumber], 0, 125);    
			}); 
			//console.log(lines[lineNumber]);			
		}
		//console.log(state)
    }
});
