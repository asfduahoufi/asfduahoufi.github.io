/* d3.csv("example_tossups.csv").then(function(data) {
  console.log(data[0]);
});
 */
 
var lines = new Array;
$.get('https://asfduahoufi.github.io/example_tossups.csv', function(data){
		lines = data.split('\n');
		console.log(lines);
	});

var tossups = [];
var length = lines.length;
var question = "";
var answer = "";
for(var i = 0; i < length; i++){
    if(i % 2 == 0){
		question = lines[i];
	} else{
		answer = lines[i];
		tossups.push([question, answer]);
	}
}
	
var showText = function (target, message, index, interval) {    
  if (index < message.length) { 
    $(target).append(message[index++]); 
    setTimeout(function () { showText(target, message, index, interval); }, interval); 
  } 
}

var i = 0;

$(function () { 
  showText("#msg", tossups[i][0], 0, 125);    
}); 
