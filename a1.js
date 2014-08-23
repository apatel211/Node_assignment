var fs = require("fs", '\n');

fs.appendFile("t1.txt" , " Hello word "+ '\n',function (Run){
    if (Run)
    {
    console.log('\n',Run);
    
    }
    else
    {
    console.log("this file is saved");
    }

});
