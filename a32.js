var newRequest = require('supertest'); 
var sys = require("sys");
var stdin = process.openStdin();
var fs = require("fs", '\n');
var date1 = new Date();


stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    console.log("you entered: [" + d.toString().substring(0, d.length-1) + "]");
  
    newRequest("https://maps.googleapis.com")
    .get("/maps/api/geocode/json?address="+ d +"&key=AIzaSyCwHUSNXvM2KwIsWP4sZZS7Zr_9CC-n_yc")
    .send()
    //.expect('Content-Type', /json/)
    .expect(200)
    .end(function(err,res) {
        if(err) {
            console.log("Error message: " + err);
        }
        else {
            console.log(res.body.status);
            if(res.body.status=="OK") {
                console.log("Server response is: " + JSON.stringify(res.body.results[0].geometry.location,null,4));
                var lat = res.body.results[0].geometry.location.lat;
                console.log("latitude is  " + lat);
                var lng = res.body.results[0].geometry.location.lng;
                console.log("longitude is  " + lng);
                var path =("/forecast/a51a6d005b51fa03a644022f02a5fa81/"+ lat + ","+ lng );
                console.log("path is  " + path);

                newRequest("https://api.forecast.io")
                .get(path)
                .send()
                //.expect('Content-Type', /json/)
                .expect(200)
                .end(function(err,res){
                    if(err) {
                        console.log("Error message: " + err);
                    }
                    else {
                        var data = {
                            date:date1,
                            time:res.body.currently.time,
                            temperature:res.body.currently.temperature,
                            humidity:res.body.currently.humidity,
                            summary:res.body.currently.summary,
                            latitude:lat,
                            longitude:lng
                        };

                        //console.log("forecast shows: " + JSON.stringify(data,null,4));
                        fs.appendFile("t3.txt",JSON.stringify(data,null,4),function (err){
                            if (err){
                                console.log('this is error',err);
                            }
                            else{
                                console.log("This file has been appened");
                            }
                        });
                    }      
                });
            } // Closes if to if status is OK or not
            else {
                console.log("Didn't work");
            }
        }            

    });  
});
