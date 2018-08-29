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

var shoeApi = ShoeCatalogueFunction()

function refreshShoes() {
  shoeApi.shoeList()
    .then(res => {
      insertShoeDataElem.innerHTML = shoeFilterTemplate({
        shoeList: res.data.data
      })
    })
}

function refreshBasket() {

  shoeApi.getBasket()
    .then(res => {
      let result = res.data;

      if (result.status === 'error') {
        alert(result.error);
      }

      // console.log(result.data.items);
      // console.log(result.data.total);

      console.log(result.total);

      insertBasketDataElem.innerHTML = shoeBasketTemplate({
        items: result.items
      })

      insertCartDataElem.innerHTML = shoeCartTemplate({
        total: result.total
      })
    })
    .catch(function (err) {
      alert(err.stack);
    });

}

window.addEventListener('DOMContentLoaded', function () {
//   shoeApi.getBasket()
// .then(res => {
//   insertCartDataElem.innerHTML = shoeCartTemplate({
//     total: res.data.total
//   })
// })
 

  refreshShoes()
  refreshBasket()

})

searchBtn.addEventListener('click', function () {

  if (filterBrand.value != '') {
    shoeApi.getShoesByBrand(filterBrand.value)
      .then(res => {
        insertShoeDataElem.innerHTML = shoeFilterTemplate({
          shoeList: res.data.data
        });
      })

  } else if (filterSize.value != '') {
    shoeApi.getShoesBySize(filterSize.value)
      .then(res => {
        insertShoeDataElem.innerHTML = shoeFilterTemplate({
          shoeList: res.data.data
        });
      })

  } else if (filterSize.value != '' && filterBrand.value != '') {
    shoeApi.getShoesByBrandAndSize(filterSize.value, filterBrand.value)
      .then(res => {
        insertShoeDataElem.innerHTML = shoeFilterTemplate({
          shoeList: res.data.data
        });
      })

  }
});

addBtn.addEventListener('click', function () {

  let shoe = {
    brand: getBrand.value,
    color: getColor.value,
    size: Number(getSize.value),
    price: parseFloat(getPrice.value),
    qty: Number(getQty.value)
  }
  shoeApi.addShoe(shoe);

  refreshShoes()
});

  function getId(id) {
    shoeApi.addToBasket(id)
      .then(res => {

        insertBasketDataElem.innerHTML = shoeBasketTemplate({
          items: res.data.items,
        });

      //   insertCartDataElem.innerHTML = shoeCartTemplate({
      //     total: res.data.total
      //   })
      // })

     refreshShoes()
     refreshBasket()
  })
  }
 function clearBasket() {
  shoeApi.clearShoppingBasket()
  .then(res => {

    insertBasketDataElem.innerHTML = shoeBasketTemplate({
      items: res.data.items,
    });

    insertCartDataElem.innerHTML = shoeCartTemplate({
      total: res.data.total
    })
  })
 }