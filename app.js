var express = require('express');
var session = require('cookie-session'); // for sessions
var bodyParser = require('body-parser'); // for setting management

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

//start the session
app.use(session({secret: 'todotopsecret'}))

.use(function(req, res, next){
    if(typeof(req.session.todolist) == 'undefined'){
        req.session.todolist = [];
        console.log('init');
    }
    next();
})
.get('/todo', function(req, res){
    res.render('todo.ejs', {todolist: req.session.todolist});
    console.log('_*_');
})
.post('/todo/add', urlencodedParser, function(req, res){
    console.log('add');
    if(req.body.newtodo != ''){
        req.session.todolist.push(req.body.newtodo);
        console.log('The item passed: ' + req.session.todolist);
    }
    res.redirect('/todo');
})
.get('/todo/delete/:id', function(req, res){
    if(req.params.id != ''){
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
.use(function(req, res, next){
    console.log('bounce');
    res.redirect('/todo');
})
.listen(8080);
