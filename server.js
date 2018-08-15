var express = require('express')
var cors = require('cors')

let session = require('express-session');

//setup middleware
var bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'));

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())


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

const ShoeApi = require('./shoe_api.js');
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