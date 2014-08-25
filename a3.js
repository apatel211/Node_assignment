var newRequest = require('supertest'); 
var sys = require("sys");
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");
  
newRequest("https://maps.googleapis.com")
    .get("/maps/api/geocode/json?address="+ d +"&key=AIzaSyCwHUSNXvM2KwIsWP4sZZS7Zr_9CC-n_yc")
    .send()
    //.expect('Content-Type', /json/)
    .expect(200)
    .end(function(err,res){
      if(err) {
        console.log("Error message: " + err);
      }
      else {
        console.log("Server response is: " + JSON.stringify(res.body.results[0].geometry.location,null,4));
      }
    });
});
