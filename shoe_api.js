var _ = require('lodash');

module.exports = function(pool)  {

    var shoes =  [

        {id: 1, color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
        {id: 2,color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
        {id: 3,color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
        {id: 4,color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
        {id: 5,color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},
        {id: 6, color : 'black', brand : "Nike",price : 350, size:5, in_stock : 10}

    ];

    const addShoes = async () => {
        //shoes.forEach(shoe, async () => {

        for (let shoe of shoes) {
            await pool.query('INSERT INTO shoes (color,brand,price,size, in_stock) VALUES($1,$2,$3,$4,$5)', [shoe.color, shoe.brand, shoe.price, shoe.size, shoe.in_stock])
        }

    }

// 


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



    async function shoeList() {
        let shoes = await pool.query('select color,brand,price,size, in_stock from shoes')
        return shoes.rows;
    }
   

    return {
    addShoes,
    getBrandQuery,
    getSizeQuery,
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