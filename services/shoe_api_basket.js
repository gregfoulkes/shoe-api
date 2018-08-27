module.exports = function () {

    async function addItemToBasket(id) {
        if (id !== '') {
            let findID = await pool.query("SELECT * FROM shoes WHERE id=$1", [id]);
            let price = findID.rows[0].price;
            if (findID.rowCount > 0) {
                let findIdOnCart = await pool.query('SELECT * FROM shoe_basket where shoe_id=$1', [id]);
                if (findIdOnCart.rowCount > 0) {
                    let found = await pool.query(`UPDATE shoes SET quantity=(quantity-1) where id=$1 and quantity >0 `, [id]);
                    if (found.rowCount > 0) {
                        await pool.query(`UPDATE shoe_basket SET qty=(qty+1), total=((qty+1)*$1)
                 WHERE shoe_id=$2`, [price, id]);
                    }
                } else {
                    await pool.query(`INSERT INTO shoe_basket(qty,shoe_id,total) 
               values($1,$2,$3)`, [1, id, price]);
                    await pool.query(`UPDATE shoes SET quantity=(quantity-1) where id=$1 and quantity >0`, [id]);
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
            return true;
        } else {
            console.log("shopping cart is empty!!!")
            return 'shopping cart is empty!!!';
        }
    }

    async function getTotal() {
        let result = await pool.query('SELECT * FROM basket');
        let cartTotal = 0.00;
        if (result.rowCount < 0) {
            return cartTotal;
        }
        let subtotals = result.rows.map(current => parseFloat(current.total))

        cartTotal = subtotals.reduce((total, current) => {
            return total + current;
        }, 0);
        return cartTotal;
    }

    async function returnBasket() {
        let basket = await pool.query('select * from basket')
        let result = basket.rows
        return result
    }



    return {
        addItemToBasket,
        deleteFromCart,
        getTotal,
        returnBasket

    }

}

