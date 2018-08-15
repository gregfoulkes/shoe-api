const ShoeApi = require('../shoe_api.js');
//const registration = Reg()
let assert = require("assert");
var _ = require('lodash');

//postgres
var postgres = require('pg')
const Pool = postgres.Pool

let useSSL = false;
if(process.env.DATABASE_URL){
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:1234@localhost:5432/shoe_api_test'

const pool = new Pool({
  connectionString,
  ssl:useSSL
}) 

describe('Waiter Web App Functions', function() {

  beforeEach(async function() {
    let shoeApi = ShoeApi(pool)

    //await pool.query("delete from shoes");
    //await shoeApi.addShoes()
  });


    it('Should return a list of all the shoes', async function(){
        let shoeApi = ShoeApi(pool)
        //await shoeApi.addShoes()
        let shoes = await shoeApi.shoeList()
       // console.log(shoes.rows)
        assert.deepEqual(shoes,
          [{color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
          {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
          {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
          {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
          {color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
          {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10}
        ])
    })

    it('Should return shoe by specified brand via database query', async function () {
      let shoeApi = ShoeApi(pool)
      //await shoeApi.addShoes()
      let shoes = await shoeApi.getBrandQuery("Nike")
      // console.log(shoes.rows)
      assert.deepEqual(shoes, [{
        color: 'blue',
        brand: "Nike",
        price: 350,
        size: 8,
        in_stock: 5
      },
      {
        color: 'black',
        brand: "Nike",
        price: 350,
        size: 5,
        in_stock: 10
      }]
      )
    })

    it('Should return shoe by specified size via database query', async function () {
      let shoeApi = ShoeApi(pool)
      //await shoeApi.addShoes()
      let shoes = await shoeApi.getSizeQuery(6)
      // console.log(shoes.rows)
      assert.deepEqual(shoes, [{
        color: 'blue',
        brand: "Adidas",
        price: 275,
        size: 6,
        in_stock: 3
      }])
    })

    it('Should return a list of all the shoes', async function(){
      let shoeApi = ShoeApi(pool)
      //await shoeApi.addShoes()
      let shoes = await shoeApi.addShoeToList({color:'blue',brand:'Puma',price:'500',size:9, qty: 1})
     // console.log(shoes.rows)
      assert.deepEqual(shoes,
        [{color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
        {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
        {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
        {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
        {color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
        {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10},
        {color:'blue',brand:'Puma',price:'500',size:9, in_stock: 1}
      ])
  })

  after(async function() {
    await pool.end();
  });
  })