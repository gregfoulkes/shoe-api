const ShoeApi = require('../shoe_api.js');

//const registration = Reg()
let assert = require("assert");

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

    //  await pool.query('i\ sql_scripts/shoe_api_table.sql')

    //  await pool.query('i\ sql_scripts/insert_shoes.sql')

     await pool.query("delete from shoes");

    // await pool.query('INSERT INTO shoes(color,brand, price, size, in_stock) values('blue', 'Nike', 350, 8, 5)',)
    // await pool.query('INSERT INTO shoes(color,brand, price, size, in_stock) values('blue', 'Adidas', 275, 6, 3)',)
    // await pool.query('INSERT INTO shoes(color,brand, price, size, in_stock) values('blue', 'New Balance', 320, 4, 7)',)
    // await pool.query('INSERT INTO shoes(color,brand, price, size, in_stock) values('blue', 'LaCoste', 400, 8, 4)',)
    // await pool.query('INSERT INTO shoes(color,brand, price, size, in_stock) values('blue', 'All Stars', 250, 7, 5)',)
    // await pool.query('INSERT INTO shoes(color,brand, price, size, in_stock) values('black', 'Nike', 350, 5, 10)',)


    await shoeApi.addShoes()
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
          //{color:'blue',brand:'Puma',price: 500,size:9, in_stock: 1}

        ])
    })

    it('Should return shoe by specified brand ', async function () {
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

    it('Should return shoe by specified size ', async function () {
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

    it('Should return a list of shoes filtered by brand and size', async function () {
      let shoeApi = ShoeApi(pool)
      //await shoeApi.addShoes()
      let shoes = await shoeApi.getBrandandSizeQuery('Adidas', 4)
      // console.log(shoes.rows)
      assert.deepEqual(shoes, [{
          color: 'blue',
          brand: "Adidas",
          price: 275,
          size: 6,
          in_stock: 3
        },
        {
          color: 'blue',
          brand: "New Balance",
          price: 320,
          size: 4,
          in_stock: 7
        }
      ])
    })

    it('Should add a shoe to list of all the shoes', async function(){
      let shoeApi = ShoeApi(pool)
      //await shoeApi.addShoes()
      await shoeApi.addShoeToList({color:'blue',brand:'Puma',price:'500',size:9, qty: 1})
      let shoes = await shoeApi.shoeList()
        assert.deepEqual(shoes,
          [{color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
          {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
          {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
          {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
          {color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
          {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10},
          {color:'blue',brand:'Puma',price: 500,size:9, in_stock: 1}
      ])
    })

    it('Should add a shoe to list of all the shoes and only increment in stock value', async function(){
      let shoeApi = ShoeApi(pool)
      //await shoeApi.addShoes()
            await shoeApi.addShoeToList({color:'blue',brand:'Puma',price:'500',size:9, qty: 1})

     await shoeApi.addShoeToList({color:'blue',brand:'Puma',price:500,size:9, qty: 10})
      let shoes = await shoeApi.shoeList()
      //console.log(shoes)
      assert.deepEqual(shoes,
        [{color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
        {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
        {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
        {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
        {color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
        {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10},
        {color:'blue',brand:'Puma',price: 500,size:9, in_stock: 11}
      ])
    })

    it('Should add an item to shopping basket', async function (){
      let shoeApi = ShoeApi(pool)

      let thisId = await pool.query('select id from shoes where color=$1',['black']);
      //console.log(thisId)
      //console.log(returnBasket)
      await shoeApi.addItemToBasket(thisId)
      let addedItem = await shoeApi.returnBasket()
      console.log('addedItem: ' + addedItem)

      assert.deepEqual(addedItem, {id: 1, shoe_id: thisId, price: 350, qty:1 })
    })


    
  after(async function() {
    await pool.end();
  });
  })

    