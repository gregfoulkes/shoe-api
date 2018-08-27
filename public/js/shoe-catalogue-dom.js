//filter selection
//var All = document.querySelector('.All')
var filterBrand = document.querySelector('.brandSelect');
var filterColor = document.querySelector('.colorSelect');
var filterSize = document.querySelector('.sizeSelect');

//display elements
var displayBrand = document.querySelector('.displayBrand')
var displayQty = document.querySelector('.displayQty');
var displayFilter = document.querySelector('.displayFilter');
var displaySize = document.querySelector('.displaySize');
var displayColor = document.querySelector('.displayColor')

//add elements
var getBrand = document.querySelector('.getBrand');
var getColor = document.querySelector('.getColor');
var getSize = document.querySelector('.getSize');
var getPrice = document.querySelector('.getPrice')
var getQty = document.querySelector('.getQty');

//buttons
var addBtn = document.querySelector('.addButton');
var searchBtn = document.querySelector('.filterButton');
var addToCart = document.querySelector('.addToCartBtn');
var clearBasketBtn = document.querySelector('.clearBasketBtn')

// shoeFiltertemplate

var shoeFilterTemplateSource = document.querySelector(".displayFilterTemplate").innerHTML;
var shoeFilterTemplate = Handlebars.compile(shoeFilterTemplateSource);
var insertShoeDataElem = document.querySelector(".displayShoelist");

//shoeBasketTemplate

var shoeBasketTemplateSource = document.querySelector('.displaylBasketTemplate').innerHTML;
var shoeBasketTemplate = Handlebars.compile(shoeBasketTemplateSource);
var insertBasketDataElem = document.querySelector(".displayBasketList");

// cartDisplayTemplate

var shoeCartTemplateSource = document.querySelector('.cartDisplayTemplate').innerHTML;
var shoeCartTemplate = Handlebars.compile(shoeCartTemplateSource);
var insertCartDataElem = document.querySelector(".displayCartTotals");

var apiRoutes = ShoeCatalogueFunction()

function refreshShoes(){
  apiRoutes.shoeList()
  .then(res => {
    insertShoeDataElem.innerHTML = shoeFilterTemplate({
      shoeList: res.data.data
    })
  })
}

window.addEventListener('DOMContentLoaded', function () {
  apiRoutes.shoeList()
    .then(res => {
      insertShoeDataElem.innerHTML = shoeFilterTemplate({
        shoeList: res.data.data
      })
    })
})

searchBtn.addEventListener('click', function(){

  if(filterBrand.value != ''){
    apiRoutes.getShoesByBrand(filterBrand.value)
  .then(res => {
    insertShoeDataElem.innerHTML = shoeFilterTemplate({
      shoeList:res.data.data
    });
  })

  }

  else if(filterSize.value != ''){
    apiRoutes.getShoesBySize(filterSize.value)
  .then(res => {
    insertShoeDataElem.innerHTML = shoeFilterTemplate({
      shoeList:res.data.data
    });
  })

  }

  else if(filterSize.value != '' && filterBrand.value != ''){
    apiRoutes.getShoesByBrandAndSize(filterSize.value,filterBrand.value)
  .then(res => {
    insertShoeDataElem.innerHTML = shoeFilterTemplate({
      shoeList:res.data.data
    });
  })

  }

});

function getId(id) {
  callFunction.addBasket(id)
  callFunction.returnBasket();
  callFunction.shoe();
  listDisplay()

  basketDisplay()
}

addBtn.addEventListener('click', function () {

  let shoe = {
    brand: getBrand.value,
    color: getColor.value,
    size: Number(getSize.value),
    price: parseFloat(getPrice.value),
    qty: Number(getQty.value)
  }
  apiRoutes.addShoe(shoe);

  refreshShoes()

});

function basketDisplay() {
callFunction.returnBasket();

  var basket = callFunction.returnBasket()
  insertBasketDataElem.innerHTML = shoeBasketTemplate({
    items: basket,
  });

  var cartTotalHTML = shoeCartTemplate({
    total: callFunction.total()
  });

  insertCartDataElem.innerHTML = cartTotalHTML;

}



// function clearBasket() {
//   callFunction.clearBasket();
//   localStorage.setItem('shoeList', JSON.stringify(callFunction.returnBasket()));
//   localStorage.removeItem('basket');
//   // force reload to update
//   listDisplay()

//   basketDisplay();
// }



//   callFunction.returnBasket();

//   ;
//   basketDisplay()
//   listDisplay()

//   })



