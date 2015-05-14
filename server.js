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
    // {client: 1, products: [{id:1,name:'Chicken', price:12}, {id:1,name:'Carrot', price:10}]},
    // {client: 2, products: [{id:1,name:'Meat', price:13}]}
];

function getIndexById(collection, id){
    var docIndex = -1;
    collection.forEach(function(item, index){
        if(item["id"] === id){
            docIndex = index;
        }
    })
    return docIndex;
}

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
    var client = req.body.client;
    var products = req.body.products;


// INDEX BY ID WEEK7
    order = {
        client: 1,
        products: products
    };

    orders.push(order);
    res.jsonp({
        msg: 'order created',
        data: order
    });
});

// document endpoints
// get info about user by id
// for eg: /users/john-doe
app.get('/api/orders/:id', function (req, res) {
    // get the id from the params
    var id = req.params.id;
    var index = getIndexById(orders, id);

    res.jsonp(orders[index]);
});

// put an updated version of a user by id
app.put('/api/orders/:id', function(req, res){
 // get the id from the params
 var id = req.params.id;
 var index = getIndexById(orders, id);

 // update the info from the body if passed or use the existing one
 users[index].name = req.body.name || users[index].name;
 users[index].price = req.body.price || users[index].price;

 res.jsonp({
 msg: 'user data updated',
 data: users[index]
 });
});

// delete an existing user by id
app.delete('/api/orders/:id', function (req, res) {
    var id = req.params.id;
    var index = getIndexById(orders, id);

    if (orders[index]) {
        orders.splice(index,1);
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