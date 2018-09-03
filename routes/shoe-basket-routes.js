module.exports = function(shoeBasketApi){

    async function addToBasket(req,res){
        try {

            //let basketId = req.params.id;
            //console.log(req.params.id)
            await shoeBasketApi.addItemToBasket(req.params.id);
            const basket = await shoeBasketApi.returnBasket()
            res.json({
                status: 'success',
                items: basket,
                total: basket.total
            });
    
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    } 

    async function returnShoeBasketAndTotal(req, res){
        try {

            const basket = await shoeBasketApi.returnBasket();
            const total = await shoeBasketApi.getTotal();
            //console.log(basket)
    
            res.json({
                status: 'success',
                items: basket,
                total: total
            });
    
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function clearTheBasket(req,res){
        try {
            //displayBasketList
            await shoeBasketApi.deleteFromCart()
            let basket = shoeBasketApi.returnBasket()
            const total = await shoeBasketApi.getTotal();
    
           // console.log(basket)
    
            res.json({
                status: 'success',
                items: basket,
                total: total
            });
    
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    return{
        addToBasket,
        returnShoeBasketAndTotal,
        clearTheBasket
    }

}