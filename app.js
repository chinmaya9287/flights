
var express = require('express');
var app = express();

app.use(express.static(__dirname ));

app.get('/', function(req, res){
    res.render('index.html', {
        title: 'Home'
    });
});


app.listen(process.env.PORT || 9999);

