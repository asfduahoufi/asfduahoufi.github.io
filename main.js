/* d3.csv("example_tossups.csv").then(function(data) {
  console.log(data[0]);
});
 */
 
var cardRules = new Array;
$.get('https://asfduahoufi.github.io/example_tossups.csv', function(data){
		cardRules = data.split('\n');
		console.log(cardRules);
	});


var showText = function (target, message, index, interval) {    
  if (index < message.length) { 
    $(target).append(message[index++]); 
    setTimeout(function () { showText(target, message, index, interval); }, interval); 
  } 
}
    
$(function () { 
  showText("#msg", "Hello, World!", 0, 125);    
}); 
