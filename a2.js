var randomwords = require('random-words');
var fs = require('fs');
var count ;

fs.appendFile("t2.txt", randomwords() +'\n', function(isError) {
	if(isError) {
		console.log(isError);
	}
	else {
		console.log("Sucessfully wrote to the file, words are generating");
	}

	fs.readFile("t2.txt",'Utf8', function(isError, data) 
	{   
		var file_content_array = data.split('\n');
		console.log("this number of times :");
		console.log(file_content_array.length);
	});

}); // Ends appendFile
