let assert = require("assert");

const request = require('supertest');

const baseURL = process.env.BASE_URL || 'http://localhost:6008';
// var express = require('express');

// var baseURL = express();

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


describe('Shoe Api Routes', function () {

    it(' get all shoes and respond with json', function () {

        request(baseURL)
            .get('/api/shoes')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
            assert.equal(result.body.status,'success');
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
        request(baseURL)
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
        request(baseURL)
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
        request(baseURL)
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
        request(baseURL)
            .get('/api/shoes/brand/Nike/size/5')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
                assert.deepEqual(result.body.data[0].brand,size)
                assert.deepEqual(result.body.data[0].brand,brand)


            }) 
        });

  
    });

    describe('Shoe Basket Api Routes', function () {

        it('Add shoe to basket and respond with json', function () {

            let id = 5

            request(baseURL)
                .get("/api/shoes/sold/" + id)
                .set('Accept', 'application/json')
                .expect(200)
                .then(result => {
                    assert.equal(result.body.status, 'success');
                })
        });

        it('Return basket and respond with json', function () {

            request(baseURL)
                .get("/api/basket")
                .set('Accept', 'application/json')
                .expect(200)
                .then(result => {
                    assert.equal(result.body.status, 'success');
                })
        });

        // after(async function () {
        //     baseURL.end();
        //   });

    });

