let assert = require("assert");

// const request = require('supertest');

var app = require('../server.js');
const ShoeRoutes = require('../routes/shoe-routes.js')
// const BasketRoutes = require('./routes/shoe-basket-routes.js')
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;
// var express = require('express');

// const BASE_URL = express();

const baseURL = process.env.public_url || 'http://localhost:6008';

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

describe('API Tests', function () {
    it('should return version number', function (done) {
        request(app)
            .get('/api')
            .end(function (err, res) {
                expect(res.body.version).to.be.ok;
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});

describe('Shoe Api Routes', function () {

    it(' get all shoes and respond with json', function () {

        request(ShoeRoutes)
            .get('/api/shoes')
            .set('Accept', 'application/json')
            //.expect(200)
            .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            expect(res.body.version).to.be.ok;

            // assert.equal(res.body.status,'success');
            }) 
    });


    it('add shoe and respond with json', function () {
        let newShoe = {
            brand: 'Puma',
            color: 'black',
            shoeSize: 1,
            quantity: 2,
            price: 850
        }
        request(ShoeRoutes)
            .post('/api/shoes')
            .send(newShoe)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)

           // .expect(newShoe)
           .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
            }) 
        });

    it(' get shoe by size and respond with json', function () {
        let size = 6
        request(ShoeRoutes)
            .get('/api/shoes/size/' + size)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
                assert.deepEqual(result.body.data[0].size,size)

            }) 
        });

    it(' get shoe by brand and respond with json', function () {
        let brand = 'Nike'
        request(ShoeRoutes)
            .get('/api/shoes/brand/' + brand)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
                assert.deepEqual(result.body.data[0].brand,brand)

            }) 
        });    

    it(' get shoe by brand and size and respond with json', function () {
       let size = 5
        request(ShoeRoutes)
            .get('/api/shoes/brand/Nike/size/5')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
                assert.deepEqual(result.body.data[0].size,size)
                assert.deepEqual(result.body.data[0].brand,brand)


            }) 
        });

  
    });

    describe('Shoe Basket Api Routes', function () {

        it('Add shoe to basket and respond with json', function () {

            let id = 5

            request(ShoeRoutes)
                .get("/api/shoes/sold/" + id)
                .set('Accept', 'application/json')
                .expect(200)
                .then(result => {
                    assert.equal(result.body.status, 'success');
                })
        });

        it('Return basket and respond with json', function () {

            request(ShoeRoutes)
                .get("/api/basket")
                .set('Accept', 'application/json')
                .expect(200)
                .then(result => {
                    assert.equal(result.body.status, 'success');
                })
        });

        // after(async function () {
        //     app.end();
        //   });
 });