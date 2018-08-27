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

var callFunction = ShoeCatalogueFunction()

function getId(id) {
  callFunction.addBasket(id)
  callFunction.returnBasket();
  callFunction.shoe();
  listDisplay()

  basketDisplay()


}

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


window.addEventListener('DOMContentLoaded', function () {
  callFunction.shoeList()
    .then(res => {
      insertShoeDataElem.innerHTML = shoeFilterTemplate({
        shoes: res.data.data
      })
    })

})
//   callFunction.returnBasket();

//   ;
//   basketDisplay()
//   listDisplay()

//   })

  function listDisplay(){


  callFunction.filter(filterBrand.value)
  .then(res => {
    insertShoeDataElem.innerHTML = shoeFilterTemplate({
      shoes:res.data.data
    });

  })

 

}

searchBtn.addEventListener('click', function(){
listDisplay()

});

// addBtn.addEventListener('click', function(){
// callFunction.add(getColor.value,
//                 getBrand.value,
//                 getSize.value,
//                 getPrice.value,
//                 getQty.value)


// var shoeList = callFunction.shoe()
// localStorage.setItem('shoeList', JSON.stringify(callFunction.shoe()))

// insertRegDataElem.innerHTML = shoeFilterTemplate({shoeList: shoeList });
// alert('Successfully added to shoe catalogue')
// location.reload()
// });