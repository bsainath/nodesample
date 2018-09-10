
var http = require('http');
var express = require('express');
var app = express();
var route= require('./route');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
app.set('port', 8080);

var originurl = 'http://localhost:4200';

var corsOptions = {
    origin: originurl,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(methodOverride());
app.use(bodyParser.json());
//app.use(cookieParser());
app.all('*', function (req, res, next) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Content-Length', '52250');
    res.header('X-XSS-Protection', '1');
    // res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Cache-Control', 'no-cache');
    next();
});


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

//setting headers for security eg: x-frame options. 


app.all('*', function (req, res, next) {

    //Origin is the HTML/AngularJS domain from where the ExpressJS API would be called.
    res.header('Access-Control-Allow-Origin', originurl);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //make sure you set this parameter and make it true so that AngularJS and Express are able to exchange session values between each other .

    next();

});

route.routing(app);


http.createServer(app).listen(8080,function(){
    console.log('Express server listening on port ' + app.get('port'));
/*let arr=[1,2,3];
    let callback=(name)=>{ 
        return new Promise((resolve,reject)=>{
if(!name){
    reject('error');
}

//setTimeout(()=>{resolve('here '+name);},1000);
resolve(name);

        });

        //setTimeout(()=>{console.log(name+' '+new Date()),1000});
    }

    function test(call,name){
        call(name);
    }
arr.forEach(element => {
    setTimeout(()=>{
        callback(element).then(data=>{console.log(data+' '+new Date());}).catch(error=>{console.log(error)});
        //test(callback,element); console.log(new Date());
    },2000);
    //console.log(element);
    
});*/


  });