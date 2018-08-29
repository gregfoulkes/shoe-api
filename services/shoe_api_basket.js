module.exports = function (pool) {

    async function addItemToBasket(id) {

        if (id) {
            id = Number(id);
            let findID = await pool.query("SELECT * FROM shoes WHERE id=$1", [id]);
            let price = findID.rows[0].price;
            if (findID.rowCount > 0) {
                let findIdOnCart = await pool.query('SELECT * FROM basket where shoe_id=$1', [id]);
                if (findIdOnCart.rowCount > 0) {
                    let found = await pool.query(`UPDATE shoes SET in_stock=(in_stock-1) where id=$1 and in_stock >0 `, [id]);
                    if (found.rowCount > 0) {
                        await pool.query(`UPDATE basket SET qty=(qty+1), total=((qty+1)*$1)
                        WHERE shoe_id=$2`, [price, id]);
                    }
                } else {
                    await pool.query(`INSERT INTO basket(qty,shoe_id, price, total) 
                        values($1,$2,$3,$4)`, [1, id, price, price]);
                    await pool.query(`UPDATE shoes SET in_stock=(in_stock-1) where id=$1 and in_stock >0`, [id]);
                    return true;
                }
                return true;
            }
        } else {
            return false;
        }

    }

    async function deleteFromCart() {
        let findId = await pool.query("SELECT * FROM basket");
        if (findId.rowCount > 0) {
            let found = findId.rows;
            for (const currentId of found) {
                let foundQty = currentId.qty;
                await pool.query(`Update shoes SET in_stock=(in_stock+$1)
               Where id=$2`, [foundQty, currentId.shoe_id]);
            }
            await pool.query("DELETE  FROM basket");
            return [];
        } else {
            return 'shopping cart is empty!!!';
        }
    }

    async function getTotal() {
        let result = await pool.query('SELECT * FROM basket');
        let cartTotal = 0.00;
        if (result.rowCount <= 0) {
            return cartTotal;
        }
        let subtotals = result.rows.map(current => parseFloat(current.total))

        cartTotal = subtotals.reduce((total, current) => {
            return total + current;
        }, 0);
        return cartTotal;
    }

    async function returnBasket() {
        let basket = await pool.query(
            `select * from basket 
            join shoes on basket.shoe_id=shoes.id`)

        let shoes = []
        if (basket.rowCount > 0) {
            let thisId = basket.rows[0].shoe_id
            let result = basket.rows
            for (shoe of result) {
                shoes.push({
                    id: basket.rows[0].shoe_id,
                    shoe_id: basket.rows[0].shoe_id,
                    color: shoe.color,
                    brand: shoe.brand,
                    price: shoe.price,
                    size: shoe.size,
                    qty: shoe.qty,
                    total: shoe.total
                })
            }
            return shoes
        }
    }

    return {
        addItemToBasket,
        deleteFromCart,
        getTotal,
        returnBasket

    }

}
