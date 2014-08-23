var randomwords = require('random-words');
var fs = require('fs');

fs.appendFile("t2.txt", randomwords() +'\n', function(words){
	if(words){
		console.log(words);
	}
	else{
		console.log("Words are generating");
	}


});
