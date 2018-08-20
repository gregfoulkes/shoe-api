var _ = require('lodash');

module.exports = function(pool)  {

    var shoes =  [

        { color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
        {color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
        {color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
        {color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
        {color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
        {color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10}

    ];

    const addShoes = async () => {
        //shoes.forEach(shoe, async () => {

        for (let shoe of shoes) {
            await pool.query('INSERT INTO shoes (color,brand,price,size, in_stock) VALUES($1,$2,$3,$4,$5)', [shoe.color, shoe.brand, shoe.price, shoe.size, shoe.in_stock])
        }

    }

    async function getBrandQuery(brand) {
        let shoeBrand = await pool.query('select color,brand,price,size, in_stock from shoes where brand=$1', [brand])
        let result = shoeBrand.rows
        return result
    }

    async function getSizeQuery(size) {
        let shoeSize = await pool.query('select color,brand,price,size, in_stock from shoes where size=$1', [size])
        let result = shoeSize.rows
        return result
    }

    async function getBrandandSizeQuery(brand,size){
        let shoeBrandSize = await pool.query('select color,brand,price,size, in_stock from shoes where brand=$1 or size=$2 ; ', [brand,size])
        let result = shoeBrandSize.rows
        return result
    }


    async function addShoeToList(params) {


// Check if shoe exists in basket
       let findShoe = await pool.query('select id from shoes where color = $1 and brand =$2 and price =$3', [params.color, params.brand, params.price])
        let foundShoe = findShoe.rowCount
       // console.log(findShoe.rows)

//if not add it
       if(foundShoe == 0){
           await pool.query('insert into shoes (color,brand,price,size, in_stock) values($1,$2,$3,$4,$5)', [params.color,params.brand,params.price,params.size,params.qty])
       }

//if yes only increment the in_stock
       if(foundShoe > 0){
           log(foundShoe)
        await pool.query('UPDATE shoes(in_stock) SET in_stock=(in_stock + $1) WHERE color=$2 and brand =$3 ', [params.qty,params.color, params.brand])   
        }
    }

    async function addItemToBasket(id){

        //get id 
        let findId = await pool.query('select * from shoes where id= $1', [id])
        let foundId = findId.rows
        if(foundId > 0){

        await pool.query('INSERT INTO basket(brand, price, qty, shoe_id) values($1, $2, $3, $4)',[foundId.brand, foundId.price, foundId.qty,id ])
    }



    }

    async function returnBasket(){
        let basket = await pool.query('select * from basket')
        let result = basket.rows
        return result
    }

    async function shoeList() {
        let shoes = await pool.query('select color,brand,price,size, in_stock from shoes')
        // console.log(shoes.rows)
        return shoes.rows;
    }
   

    return {
    addShoes,
    addShoeToList,
    getBrandQuery,
    getSizeQuery,
    getBrandandSizeQuery,
    addItemToBasket,
    returnBasket,
    shoeList

    }
  
    }

   // async function addShoeToList(params) {


        //         let shoeRows = await pool.query('select color,brand,price,size, in_stock from shoes')
        //         let shoes = shoeRows.rows
        //         console.log(shoes)
        //         var exists = false;
        //         for (let param in params){
        //         for (var i = 0; i < shoes.length; i++) {
        //             var shoe = shoes[i]
        //             if (param.color === shoes.color && param.brand === shoe.brand && param.size === shoe.size && param.price === shoe.price) {
        //               shoe.in_stock += shoes.in_stock;
        //               exists = true;
        //             }
        //           }
              
        //           if (!exists) {
        //           await pool.query('INSERT INTO shoes (color,brand,price,size, in_stock) VALUES($1,$2,$3,$4,$5)', [param.color, param.brand, param.price, param.size, param.qty])
          
        //           }
                
        //     }
              
        //         console.log(shoes)
        //         return shoes
            
        //       }

    // async function getBrand (brand) {
    //     let shoeRows = await pool.query('select color,brand,price,size, in_stock from shoes')
    //     let shoes = shoeRows.rows
    //     for(let shoe of shoes) {
    //         if(shoe.brand == brand){
    //             return shoe
    //         }
    //     }

    // } 

    // async function getPrice (price) {
    //     let shoeRows = await pool.query('select color,brand,price,size, in_stock from shoes')
    //     let shoes = shoeRows.rows
    //     for(let shoe of shoes) {
    //         if(shoe.price == price){
    //             return shoe
    //         }
    //     }

    // } 

    // async function getSize (size) {
    //     let shoeRows = await pool.query('select color,brand,price,size, in_stock from shoes')
    //     let shoes = shoeRows.rows
    //     for(let shoe of shoes) {
    //         if(shoe.size == size){
    //             return shoe
    //         }
    //     }

    // } 

        // async function getPriceQuery(price) {
    //     let shoePrice = await pool.query('select color,brand,price,size, in_stock from shoes where price=$1', [price])
    //     let result = shoePrice.rows
    //     return result
    // }

        // async function filterBy(params) {

    //     let shoeRows = await pool.query('select * from shoes')
    //     //console.log(shoeRows)
    //     let shoes = shoeRows.rows

    //     for (let shoe in shoes) {
    //         for (let param in params) {
    //             if (shoe.brand == param.brand) {
    //                 //console.log(param.brand)
    //                 var brand = await pool.query('select * from shoes where brand=$1', [param.brand]);
    //                // console.log(brand.rows)
    //                return brand.rows

    //             }
    //         }

    //     }
    // }
  

    //    async function loDashFilter(params) {
//         let shoeRows = await pool.query('select * from shoes')
//         let shoes = shoeRows.rows
//         filteredShoes = _.filter(shoes,params);
//        return filteredShoes
//       }