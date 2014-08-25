var fs = require('fs');

var count = 0;
fs.watch('text1.txt', function(filename) {
    count++;
console.log('Contents Changed ' + count  + ' times');

});