function ShoeCatalogueFunction() {

  async function getShoesByBrand(brand) {
    try {
      const response = await axios.get("/api/shoes/brand/" + brand);

      return response;
    } catch (error) {
      alert(error);
    }
  }

  async function getShoesBySize(size) {
    try {
      const response = await axios.get("/api/shoes/size/" + size);

      return response;
    } catch (error) {
      alert(error);
    }
  }

  async function getShoesByBrandAndSize(brand, size) {
    try {
      const response = await axios.get(
        "/api/shoes/brand/" + brand + "/size/" + size
      );

      return response;
    } catch (error) {
      alert(error);
    }
  }

  async function addShoeToList(brand, color, size, price, in_stock) {
    try {
      const response = await axios.post("/api/shoes/", {
        brand,
        color,
        size,
        price,
        in_stock
      });

      return response;
    } catch (error) {
      alert(error);
    }
  }

  async function addToBasket(shoeId) {
    try {
      const response = await axios.post("/api/shoes/sold/" + shoeId);
      return response;
    } catch (error) {
      alert(error);
    }
  }

  async function clearShoppingBasket() {
    try {
      const response = await axios.post("/api/clear/");
      return response;
    } catch (error) {
      alert(error);
    }
  }

  async function shoeList() {
    try {
      const response = await axios.get("/api/shoes");
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

    addShoeToList,
    addToBasket,
    clearShoppingBasket,
  }

  }
