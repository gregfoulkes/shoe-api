let assert = require("assert");

const request = require('supertest');

const baseURL = 'http://localhost:6008';

const Connection = require('../config/test_database_connection.js')

const pool = Connection()

const ShoeApi = require('../services/shoe_api.js');
const ShoeApiBasket = require('../services/shoe_api_basket.js');

const result = {
            status: 'success',
            data: [

                {color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
                {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
                {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
                {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
                {color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
                {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10}
        
            ]
        }

    function theResult(pool) {
        // let getIds = await pool.query('select * from shoes')

        let shoes = []
        for (shoe in getIds.rows) {
            reulst.data.push({
                id: shoe.id,
                color: shoe.color,
                brand: shoe.brand,
                price: shoe.price,
                size: shoe.size,
                in_stock: shoe.in_stock
            })
        }
        return shoes
    }

describe('GET /api/shoes', function () {

  beforeEach(async function() {
    let shoeApi = ShoeApi(pool)

    await pool.query("delete from basket");

    await pool.query("delete from shoes");

    await shoeApi.addShoes()
  });

    it(' get all shoes and respond with json', function () {

        request(baseURL)
            .get('/api/shoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            // .expect(result)
            .expect(200)
    });

    it('add shoe and respond with json', function () {
        let newShoe = {
            brand: 'Puma',
            color: 'black',
            shoeSize: 1,
            quantity: 2,
            price: 850
        }
        request(baseURL)
            .post('/api/shoes')
            .send(newShoe)
            .set('Accept', 'application/json')
           // .expect(newShoe)
           .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
            }) 
        });

    it(' get shoe by size and respond with json', function () {
        let size = 6
        request(baseURL)
            .get('/api/shoes/size/' + size)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
            }) 
        });

    it(' get shoe by brand and respond with json', function () {
        let brand = 'Nike'
        request(baseURL)
            .get('/api/shoes/brand/' + brand)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
            }) 
        });

    it(' get shoe by brand and size and respond with json', function () {
       
        request(baseURL)
            .get('/api/shoes/brand/Nike/size/5')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
            }) 
        });

    after(async function () {
        await pool.end();
      });
    });


   
