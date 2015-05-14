// dependancies
var express = require('express')
var fs = require("fs");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// create app
var app = express()


// configuration and middleware 
app.use(express.static('public'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());


var orders = [

    {name: 'Телешко', price: '12'},
    {name: 'Пилеико', email: '13'},
];
// routes
app.get('/', function (req, res) {
  res.render('index');
})

app.get('/api/orders', function (req, res) {
    res.jsonp(orders);
});

// post new user to the collection
app.post('/api/orders', function (req, res) {
    // req.body contains the incoming fields and values
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
// INDEX BY ID WEEK7
    orders[id] = {
        name: name,
        price: price
    };

    res.jsonp({
        msg: 'order created',
        data: orders[id]
    });
});

// document endpoints
// get info about user by id
// for eg: /users/john-doe
app.get('/api/orders/:id', function (req, res) {
    // get the id from the params
    var id = req.params.id;
    res.jsonp(orders[id]);
});

// delete an existing user by id
app.delete('/api/orders/:id', function (req, res) {
    var id = req.params.id;
    if (orders[id]) {
        delete(orders[id]);
        res.jsonp('order ' + id + ' successfully deleted!');
    } else {
        res.jsonp('order ' + id + ' does not exist!');
    }
});

// listen for files: /post -> /views/post.jade
app.get("/:fileName", function(req, res, next){
  if(req.params && req.params.fileName){
    var fileName = req.params.fileName.replace(".html","");

    // if jade file exists
    if(fs.existsSync(__dirname+"/views/"+fileName+".jade")){
      res.render(fileName);
    // if post is in posts
    } else {
      next();
    }

  } else {
    next();
  }
})

// set up server
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})