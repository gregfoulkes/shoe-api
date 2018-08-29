function ShoeCatalogueFunction() {

  function getShoesByBrand(brand) {
    try {
      const response = axios.get("/api/shoes/brand/" + brand);

      return response;
    } catch (error) {
      alert(error);
    }
  }

  function getShoesBySize(size) {
    try {
      const response = axios.get("/api/shoes/size/" + size);

      return response;
    } catch (error) {
      alert(error);
    }
  }

  function getShoesByBrandAndSize(brand, size) {
    try {
      const response = axios.get(
        "/api/shoes/brand/" + brand + "/size/" + size
      );

      return response;
    } catch (error) {
      alert(error);
    }
  }

  function addShoe(shoe) {
    try {
      const response = axios.post("/api/shoes/", shoe);

      return response;
    } catch (error) {
      alert(error);
    }
  }

  function addToBasket(shoeId) {
    try {
      const response = axios.get("/api/shoes/sold/" + shoeId);
      return response;
    } catch (error) {
      alert(error);
    }
  }

  function clearShoppingBasket() {
    try {
      const response = axios.post("/api/clear/");
      return response;
    } catch (error) {
      alert(error);
    }
  }

  function shoeList() {
    try {
      const response = axios.get("/api/shoes");
      return response;
    } catch (error) {
      alert(error);
    }
  }

  function getBasket() {
    try {
      const response = axios.get("/api/basket");
      return response;
    } catch (error) {
      alert(error);
    }
  }

  return {
    shoeList,
    getShoesByBrand,
    getShoesBySize,
    getShoesByBrandAndSize,

    addShoe,
    addToBasket,
    clearShoppingBasket,
    getBasket
  }

}
