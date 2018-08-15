function ShoeCatalogueFunction(storedShoes, basket) {

  var shoes =  [

          {id: 1, color : 'blue', brand : "Nike",price : 350, size:8, in_stock : 5},
          {id: 2,color : 'blue', brand : "Adidas",price : 275, size:6, in_stock : 3},
          {id: 3,color : 'blue', brand : "New Balance",price : 320, size:4, in_stock : 7},
          {id: 4,color : 'blue', brand : "LaCoste",price : 400, size:8, in_stock : 4},
          {id: 5,color : 'blue', brand : "All Stars",price : 250, size:7, in_stock : 5},

          {id: 6,color : 'red', brand : "Nike",price : 350,  size:7, in_stock : 9},
          {id: 7,color : 'red', brand : "Adidas",price : 275, size:4, in_stock : 3},
          {id: 8,color : 'red', brand : "New Balance",price : 320, size:6, in_stock : 2},
          {id: 9,color : 'red', brand : "LaCoste",price : 400, size:5, in_stock : 9},
          {id: 10,color : 'red', brand : "All Stars",price : 250, size:9, in_stock : 6},

          {id: 11,color : 'green', brand : "Nike",price : 350, size:5, in_stock : 1},
          {id: 12,color : 'green', brand : "Adidas",price : 275, size:4, in_stock : 9},
          {id: 13,color : 'green', brand : "New Balance",price : 320, size:8, in_stock : 3},
          {id: 14,color : 'green', brand : "LaCoste",price : 400, size:6, in_stock : 7},
          {id: 15,color : 'green', brand : "All Stars",price : 250, size:8, in_stock : 8},

          {id: 16,color : 'black', brand : "Nike",price : 350, size:7, in_stock : 8},
          {id: 17,color : 'black', brand : "Adidas",price : 275, size:4, in_stock : 2},
          {id: 18,color : 'black', brand : "New Balance",price : 320, size:8, in_stock : 4},
          {id: 19,color : 'black', brand : "LaCoste",price : 400, size:6, in_stock : 2},
          {id: 20,color : 'black', brand : "All Stars",price : 250, size:5, in_stock : 6},

          {id: 21,color : 'white', brand : "Nike",price : 350, size:4, in_stock : 7},
          {id: 22,color : 'white', brand : "Adidas",price : 275, size:6, in_stock : 6},
          {id: 23,color : 'white', brand : "New Balance",price : 320, size:8, in_stock : 3},
          {id: 24,color : 'white', brand : "LaCoste",price : 400, size:4, in_stock : 5},
          {id: 25,color : 'white', brand : "All Stars",price : 250, size:9, in_stock : 1}

  ];

var filteredShoes = []
  var shoppingBasket = basket || [];

  var basketTotal = 0

  if (storedShoes && storedShoes.length > 0) {
    shoes = []
    for (var i = 0; i < storedShoes.length; i++) {
      shoes.push(storedShoes[i])
    }
  }

  function shoeCatalogueFilter(params) {
    filteredShoes = _.filter(shoes,params);
    return _.filter(shoes,params);
  }

  function addShoeToList( color, brand, size, price, in_stock) {

    var exists = false;

    for (var i = 0; i < shoes.length; i++) {
      var shoe = shoes[i]
      if (color === shoe.color && brand === shoe.brand && size === shoe.size && price === shoe.price) {
        shoe.in_stock += shoes.in_stock;
        exists = true;
      }
    }

    if (!exists) {
      var id = shoes.length + 1;
      shoes.push({
        id: id,
        color: color,
        brand: brand,
        size: parseInt(size),
        price: parseInt(price),
        in_stock: parseInt(in_stock)
      });
    }

    return shoes

  }

  function addToBasket(id) {

    var itExists = false;
    var item = shoes.find(shoeId => (shoeId.id == id));



    if (item.in_stock > 0) {

      shoppingBasket.map(current => {

        if (current.id == id) {
          current.qty += 1;
          //  basketTotal = current.qty * current.price
          itExists = true;

        }
      });

      if (!itExists) {


        shoppingBasket.push({
          id: id,
          color: item.color,
          brand: item.brand,
          size: item.size,
          price: item.price,
          qty: 1

        });
      }

      shoes.map(current => {


        if (current.id == id) {
          current.in_stock = current.in_stock -= 1

        }
      });

      return true
    }
    return false
  }

  function totalCart() {
    let subTotal = 0
    if (shoppingBasket) {
      subTotal = shoppingBasket.reduce((total, current) => (total + (current.price * current.qty)), 0)
    }
    return basketTotal + subTotal
  }

  function clearShoppingBasket() {
    for (let i = 0; i < shoes.length; i++) {
      // temp vars
      let current = shoes[i];
      let matchedShoe = shoppingBasket.find(shoe => (shoe.id == current.id));
      // replace product
      if (matchedShoe) {
        current.in_stock += matchedShoe.qty;

      }
    }
    basketTotal = 0.00;
    shoppingBasket = [];
  }


  function returnBasketTotal() {
    return basketTotal
  }

  function returnCartLength() {
    return shoppingBasket.length
  }

  function returnShoppingBasket() {
    return shoppingBasket
  }

  function shoeList() {
    return shoes
  }

  return {
    filter: shoeCatalogueFilter,
    add: addShoeToList,
    returnBasket: returnShoppingBasket,
    addBasket: addToBasket,
    shoe: shoeList,
    total: totalCart,
    cartLength: returnCartLength,
    clearBasket: clearShoppingBasket,
    basketTotal: returnBasketTotal,
  }

  }
