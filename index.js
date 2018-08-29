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

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

//connect to postgres database
var postgres = require('pg')
const Pool = postgres.Pool

let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:1234@localhost:5432/shoe_api'

const pool = new Pool({
    connectionString,
    ssl: useSSL
})

app.use(function (req, res, next) {

    next();

});

const ShoeApi = require('./services/shoe_api.js');
const ShoeBasketApi = require('./services/shoe_api_basket.js');
const shoeBasketApi = ShoeBasketApi(pool)
const shoeApi = ShoeApi(pool);

app.get('/', async function (req, res, next) {
    res.json('Hello')
})

app.get('/api/shoes', async function (req, res) {
    try {
        const shoes = await shoeApi.shoeList();
        res.json({
            status: 'success',
            data: shoes
        });
    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

app.get('/api/shoes/brand/:brandname', async function (req, res) {
    let brandName = req.params.brandname
    try {
        const shoeByBrand = await shoeApi.getBrandQuery(brandName);
        console.log(shoeByBrand)
        res.json({
            status: 'success',
            data: shoeByBrand
        });
    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

app.get('/api/shoes/size/:size', async function (req, res) {
    let shoeSize = req.params.size
    try {
        const shoeBySize = await shoeApi.getSizeQuery(shoeSize);
        console.log(shoeBySize)
        res.json({
            status: 'success',
            data: shoeBySize
        });
    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

app.get('/api/shoes/brand/:brandname/size/:size	', async function (req, res) {
    let shoeSize = req.params.size
    let shoeBrand = req.params.brand

    try {
        const shoeByBrandAndSize = await shoeApi.getBrandandSizeQuery(shoeBrand, shoeSize);

        //console.log(shoeBySize)
        res.json({
            status: 'success',
            data: shoeByBrandAndSize
        });
    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

app.post('/api/shoes', async function (req, res) {

    try {
        await shoeApi.addShoeToList(req.body);
        const shoes = await shoeApi.shoeList();

        console.log(req.body)
        res.json({
            status: 'success',
            data: shoes
        });
    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

app.get('/api/shoes/sold/:id', async function (req, res) {
    try {

        //let basketId = req.params.id;
        //console.log(req.params.id)
        await shoeBasketApi.addItemToBasket(req.params.id);
        const basket = await shoeBasketApi.returnBasket()
        res.json({
            status: 'success',
            items: basket,
            total: basket.total
        });

    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

app.get('/api/basket', async function (req, res) {
    try {

        const basket = await shoeBasketApi.returnBasket();
        const total = await shoeBasketApi.getTotal();
        console.log(basket)

        res.json({
            status: 'success',
            items: basket,
            total: total
        });

    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }

})

app.get('api/clear', async function (req, res) {
    try {
        displayBasketList
        await shoeBasketApi.deleteFromCart()
        let basket = returnBasket()
        console.log(basket)

        res.json({
            status: 'success',
            items: basket
            // total:basket.total
        });

    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

//start the server
let PORT = process.env.PORT || 6008;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});