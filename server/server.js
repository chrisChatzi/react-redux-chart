var config = require("./config"),
    express = require('express'),
    path = require('path'),
    app = require('express')();
    http = require('http').Server(app),
    httpPort = process.env.PORT || config.port;

//send file request
    var httpServerFunction = function(){
        //express
            //static
                app.use(express.static(path.join(__dirname, '../dist')));
        //http listen
        http.listen(httpPort, function(){
            console.log('listening on:' + config.port);
        });
    };

httpServerFunction();