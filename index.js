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

// app.engine('handlebars', exphbs({
//     defaultLayout: 'main',
//     helpers: {
//       flashMessage: function () {
//         if (this.messages.info == "Shift(s) successfully added!") {
//           return "success";
//         } else {
//           return "failure";
//         }
//       }
//     }
//   }));
  
// app.set('view engine', 'handlebars');

app.use(function (req, res, next) {

    next();

});

const ShoeApi = require('./services/shoe_api.js');
// const ShoeRoutes = require('./js/shoe_api.js');

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
        const insertShoe = await shoeApi.addShoeToList(req.body);
        console.log(req.body)
        res.json({
            status: 'success',
            data: insertShoe
        });
    } catch (err) {
        res.json({
            status: 'error',
            error: err.stack
        });
    }
})

// app.post('/api/shoes', async function (req, res) {
//     try {
        
//         let shoeData = req.body;
//         const shoe = await shoeApi.createShoe(shoeData);
//         res.json({
//             status: 'success',
//             data: shoe
//         });

//     } catch (err) {
//         res.json({
//             status: 'error',
//             error: err.stack
//         });
//     }
// })

//start the server
let PORT = process.env.PORT || 6008;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});