var _ = require('lodash');

module.exports = function (pool) {

    var shoes = [

        {
            color: 'blue',
            brand: "Nike",
            price: 350,
            size: 8,
            in_stock: 5
        },
        {
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
        },
        {
            color: 'blue',
            brand: "LaCoste",
            price: 400,
            size: 8,
            in_stock: 4
        },
        {
            color: 'blue',
            brand: "All Stars",
            price: 250,
            size: 7,
            in_stock: 5
        },
        {
            color: 'black',
            brand: "Nike",
            price: 350,
            size: 5,
            in_stock: 10
        }

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

    async function getBrandandSizeQuery(brand, size) {
        let shoeBrandSize = await pool.query('select color,brand,price,size, in_stock from shoes where brand=$1 or size=$2 ; ', [brand, size])
        let result = shoeBrandSize.rows
        return result
    }


    async function addShoeToList(params) {
        //console.log(params)

        try {
            let findShoe = await pool.query('select * from shoes where color=$1 and brand=$2 and price=$3', [params.color, params.brand, params.price])
            let foundShoe = findShoe.rowCount
            //console.log('match', findShoe.rowCount)

            // console.log(findShoe.rows[0].id)

            //if not add it
            if (foundShoe === 0) {
                await pool.query('insert into shoes (color,brand,price,size, in_stock) values($1,$2,$3,$4,$5)', [params.color, params.brand, params.price, params.size, params.qty])
            }

            //if yes only increment the in_stock
            if (foundShoe > 0) {
                //log(foundShoe)
                await pool.query('UPDATE shoes SET in_stock=in_stock + $1 WHERE id=$2', [params.qty, findShoe.rows[0].id])
            }

        } catch (error) {
            error.stack;
        }
        // Check if shoe exists in basket

    }

    async function addItemToBasket(id) {

        //get id 
        let findId = await pool.query('select * from shoes where id=$1', [id])
        let foundId = findId.rows[0].id
        let findBasketItem = await pool.query('select from basket where id=$1', [foundId])
        // console.log('no match found', findBasketItem.rowCount)
        if (findBasketItem.rowCount === 0) {

            await pool.query('INSERT INTO basket( price, shoe_id) values($1, $2)', [findId.rows[0].price, foundId])
            await pool.query('UPDATE basket SET qty=(qty + 1) WHERE id=$1', [foundId])
            await pool.query('UPDATE shoes SET in_stock=in_stock - 1 WHERE id=$1', [foundId])

        } else if (findBasketItem.rowCount > 0) {

            let updateRow = await pool.query('UPDATE basket SET qty=qty + 1 WHERE shoe_id=$1', [id])
        }
    }

    async function deleteItemfromCart(id) {
        let findMatches = await pool.query('select * from basket where shoe_id=$1' [id]);
        let foundMateches = findMatches.rowCount


        if (foundMateches === 1) {
            await pool.query('delete from basket where id=$1 ' [id])

        }
        return
    }

    async function returnBasket() {
        let basket = await pool.query('select shoe_id, price, qty from basket')
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
        deleteItemfromCart,
        shoeList

    }

}

