module.exports = function(shoeApi) {

    async function listOfShoes(req,res){
        try {
            const shoes = await shoeApi.shoeList();
            res.json({
                status: 'success',
                data: shoes
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }

    }

    async function filterShoeByBrand(req,res){
        let brandName = req.params.brandname
        try {
            const shoeByBrand = await shoeApi.getBrandQuery(brandName);
            //console.log(shoeByBrand)
            res.json({
                status: 'success',
                data: shoeByBrand
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    } 

    async function filterShoeBySize(req, res){

        let shoeSize = req.params.size
        try {
            const shoeBySize = await shoeApi.getSizeQuery(shoeSize);
            //console.log(shoeBySize)
            res.json({
                status: 'success',
                data: shoeBySize
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function filterShoeByBrandSize(req, res){
        let shoeSize = req.params.size
        let shoeBrand = req.params.brand
    
        try {
            const shoeByBrandAndSize = await shoeApi.getBrandandSizeQuery(shoeBrand, shoeSize);
    
            console.log(shoeByBrandAndSize)
            res.json({
                status: 'success',
                data: shoeByBrandAndSize
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function addShoeToList(req, res){
        try {
            await shoeApi.addShoeToList(req.body);
            const shoes = await shoeApi.shoeList();
    
           // console.log(req.body)
            res.json({
                status: 'success',
                data: shoes
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    return{
        listOfShoes,
        filterShoeByBrand,
        filterShoeBySize,
        filterShoeByBrandSize,
        addShoeToList
    }

}