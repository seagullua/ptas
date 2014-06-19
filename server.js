
(function () {
    var config = {};
    config['port'] = 30005;
    config['site_name'] = "ПТ Авто 8.2 Программный комплекс для автобизнеса";
    config['site_description'] = 'Программный продукт для комплексной автоматизации учета на предприятиях автобизнеса.';
    config['site_keywords'] = 'keyword';

    var path = require('path');
    var fse = require('fs-extra');

    var content = {};
    content['main_page'] = fse.readJSONFileSync('content/main_page.json');

    //Load Exress modules
    var http =          require('http');
    var express =       require('express');
    var morgan =        require('morgan');

    //Start application
    var app = express();


    //Configure middleware
    app.set('views', path.join(__dirname + '/templates'));
    app.set('view engine', 'ejs');

    app.use(morgan({ format: 'dev' }));

    app.use(function(req, res, next){
        req.page = {
            keywords: config.site_keywords,
            title: '',
            description: config.site_description
        };
        res.locals.config = config;
        res.locals.page = req.page;

        next();
    });

    app.get('/', function(req, res){
        res.render('main_page',{
            content: content['main_page']
        });
    });



    //Static
    app.use('/static', express.static(path.join(__dirname, 'www' )));

    app.use(function(req, res){
        res.redirect('/');
    });

    var server = http.createServer(app);
    server.listen(config.port);


})();
