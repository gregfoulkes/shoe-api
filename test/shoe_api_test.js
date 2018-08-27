const ShoeApi = require('../services/shoe_api.js');
const ShoeApiBasket = require('../services/shoe_api_basket.js');

let assert = require("assert");

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

describe('Shoe Api shoe Functions', function() {

  beforeEach(async function() {
    let shoeApi = ShoeApi(pool)

    await pool.query("delete from basket");

    await pool.query("delete from shoes");

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
      await shoeApi.addShoeToList({color:'blue',brand:'Puma',price:500,size:9, qty: 1})

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



    // it('Should only increment the qauntity of an item in the shopping basket', async function (){
    //   let shoeApi = ShoeApi(pool)
    //   let thisId = await pool.query('select id from shoes where color=$1',['black']);
    //   await shoeApi.addItemToBasket(thisId.rows[0].id)
    //   await shoeApi.addItemToBasket(thisId.rows[0].id)
    //   //console.log('id',thisId.rows[0].id)
    //   let basketItem =  await pool.query('select shoe_id, price, qty from basket')
    //   assert.deepEqual(basketItem.rows, [{shoe_id: thisId.rows[0].id, price: 350, qty:2 }])
    // })

    // it('Should delete an item in the shopping basket', async function (){
    //   let shoeApi = ShoeApi(pool)
    //   let thisId = await pool.query('select id from shoes where color=$1',['black']);
    //   await shoeApi.addItemToBasket(thisId.rows[0].id)
    //   await shoeApi.deleteItemfromCart(thisId.rows[0].id)
    //   //console.log('id',thisId.rows[0].id)
    //   let basketItem =  await shoeApi.returnBasket()

    //   assert.deepEqual(basketItem, [{}])
    //  
    // })


    

     })

  describe('Shoe Api shoe basket Functions', function() {

    beforeEach(async function() {
      let shoeApi = ShoeApi(pool)
  
      await pool.query("delete from basket");
  
      await pool.query("delete from shoes");
  
      await shoeApi.addShoes()
    });

    it('Should add an item to shopping basket', async function (){
      let shoeApi = ShoeApiBasket(pool)
      let thisId = await pool.query('select id from shoes where color=$1',['black']);
      await shoeApi.addItemToBasket(thisId.rows[0].id)
      let basketItem =  await pool.query('select shoe_id, price, qty from basket')
      assert.deepEqual(basketItem.rows, [{shoe_id: thisId.rows[0].id, price: 350, qty:1 }])
    })

    it('Should add a shoe to basket and increment qty while decrementing in stock value of shoes', async function () {
          let shoeApiBasket = ShoeApiBasket(pool);
          let shoeApi = ShoeApi(pool)


          let thisId = await pool.query('select id from shoes where color=$1', ['black']);
          await shoeApiBasket.addItemToBasket(thisId.rows[0].id)
          await shoeApiBasket.addItemToBasket(thisId.rows[0].id)

          let shoes = await pool.query('select shoe_id, price, qty from basket')
          let shoeRows = shoes.rows

          let shoeList =  [{color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
          {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
          {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
          {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
          {color : 'blue',  brand : "All Stars",price : 250, size:7, in_stock : 5},
          {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 8},
          ]
        
      assert.deepEqual(shoeRows, [{
        shoe_id: thisId.rows[0].id,
        price: 350,
        qty: 2
      }, ])
      let returnedShoeList = await shoeApi.shoeList();
      assert.deepEqual(returnedShoeList, shoeList)
      })

      it('Should return the total of an item from the shopping basket', async function (){
        let shoeApi = ShoeApiBasket(pool)
        let thisId = await pool.query('select id from shoes where color=$1',['black']);
        await shoeApi.addItemToBasket(thisId.rows[0].id)
        await shoeApi.addItemToBasket(thisId.rows[0].id)

        assert.deepEqual(await shoeApi.getTotal(), 700.00)
      })

      it('Should clear items from the shopping basket', async function (){
        let shoeApi = ShoeApiBasket(pool)
        let thisId = await pool.query('select id from shoes where color=$1',['black']);
        await shoeApi.addItemToBasket(thisId.rows[0].id)
        await shoeApi.addItemToBasket(thisId.rows[0].id)

        assert.deepEqual(await shoeApi.deleteFromCart(), [])
      })

      it('Should clear items from the shopping basket', async function (){
        let shoeApi = ShoeApiBasket(pool)
        // let thisId = await pool.query('select id from shoes where color=$1',['black']);
        // await shoeApi.addItemToBasket(thisId.rows[0].id)
        // await shoeApi.addItemToBasket(thisId.rows[0].id)

        assert.deepEqual(await shoeApi.deleteFromCart(), 'shopping cart is empty!!!')
      })
    
    
      after(async function () {
        await pool.end();
      });

  })
    