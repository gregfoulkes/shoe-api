var express = require('express')
var app = express();
var cors = require('cors')
var exphbs = require('express-handlebars');

let flash = require('express-flash');
let session = require('express-session');
const axios = require('axios');

//setup middleware
var bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

app.use(flash());

app.use(cors());

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

const Connection = require('./config/database_connection.js')

app.use(function (req, res, next) {

    next();

});

const ShoeRoutes = require('./routes/shoe-routes.js')
const BasketRoutes = require('./routes/shoe-basket-routes.js')

const ShoeApi = require('./services/shoe_api.js');
const ShoeBasketApi = require('./services/shoe_api_basket.js');
const shoeBasketApi = ShoeBasketApi(Connection())
const shoeApi = ShoeApi(Connection());

const shoeRoutes = ShoeRoutes(shoeApi)
const basketRoutes = BasketRoutes(shoeBasketApi)

app.get('/', async function (req, res, next) {
    res.json('Hello')
})

app.get('/api/shoes', shoeRoutes.listOfShoes)

app.get('/api/shoes/brand/:brandname', shoeRoutes.filterShoeByBrand);

app.get('/api/shoes/size/:size', shoeRoutes.filterShoeBySize);

app.get('/api/shoes/brand/:brand/size/:size',shoeRoutes.filterShoeByBrandSize);

app.post('/api/shoes', shoeRoutes.filterShoeByBrandSize);

app.get('/api/shoes/sold/:id', basketRoutes.addToBasket);

app.get('/api/basket', basketRoutes.returnShoeBasketAndTotal);

app.post('/api/clear', basketRoutes.clearTheBasket);

//start the server
let PORT = process.env.PORT || 6008;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});