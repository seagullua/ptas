
var path = require('path');


(function () {

    //Load Exress modules
    var http =          require('http');
    var express =       require('express');

    //Start application
    var app = express();


    //Configure middleware
    app.configure(function () {
        app.set('views', path.join(__dirname + '/templates'));
        app.set('view engine', 'ejs');

        app.use(express.logger('dev'));
        app.use(express.urlencoded());

        //Static
        app.use('/static', express.static(path.join(__dirname, 'www' )));
    });

    var server = http.createServer(app);
    server.listen(30005);


})();
