UPDATE shoes
   SET in_stock = in_stock + 1
WHERE brand = 'Nike';
  AND in_stock = 5;

      UPDATE shoes 
      SET in_stock = in_stock - 1 
      WHERE id = $1 
      AND in_stock > 0;
   
   
    UPDATE shopping_basket_item 
    SET qty = qty + 1 
    AND price = price * (qty + 1)
     WHERE shoe_id = $1;

create table shoes (
	id serial not null primary key,
    color text not null,
    brand  text not null ,
	price int not null,
    size int not null,
    in_stock int not null

);

create table basket_item(
  id serial not null primary key,
  basket_id INTEGER not null,
  shoe_id int not null,
  price DECIMAL(7, 2) not null,
  qty SMALLINT DEFAULT 1,
  FOREIGN KEY (shoe_id) REFERENCES shoes(id)
  FOREIGN KEY (basket_id) REFERENCES basket(id)
)

create table basket(
  id serial not null primary key,
  basket_status VARCHAR,
  date_created date not null default now(),
  date_checked_out date,
  total DECIMAL(7, 2) not null default 0.00
)

create table shoes (
	id serial not null primary key,
    color text not null,
    brand  text not null ,
	price int not null,
    size int not null,
    in_stock int not null

);

  async function addShoe(brand, color, size, in_stock, price) {
    let shoes = await pool.query(
      "SELECT id FROM shoes WHERE brand = $1 AND color = $2 AND size = $3",
      [brand, color, size]
    );

    if (shoes.rowCount === 0) {
      await pool.query(
        "INSERT INTO shoes(color, brand, price, size, in_stock) VALUES($1, $2, $3, $4, $5)",
        [color, brand, price, size, in_stock]
      );
    } else {
      const shoeId = shoes.rows[0].id;
      await pool.query(
        "UPDATE shoes SET in_stock = in_stock + 1 WHERE shoes.id = $1",
        [shoeId]
      );
    }
  }

    async function addShoeToShoppingBasket(shoeId) {
    // check if basket already exist, if not create a new one

    let basketIds = await pool.query("SELECT id FROM shopping_basket");

    if (basketIds.rowCount === 0) {
      await pool.query(
        "INSERT INTO shopping_basket(basket_status) VALUES($1)",
        ["active"]
      );

      basketIds = await pool.query("SELECT id FROM shopping_basket");
    }

    let basketId = basketIds.rows[0];

    // check if item already exist, if it exist increment counter otherwise insert a new one into the table

    let newIds = await pool.query(
      "SELECT id FROM shopping_basket_item WHERE shoe_id = $1",
      [shoeId]
    );

    if (newIds.rowCount === 0) {
      let price = pool.query("SELECT price from shoes WHERE id = $1", [shoeId]);
      await pool.query(
        "INSERT INTO shopping_basket_item(basket_id, shoe_id, price, qty) VALUES($1, $2, $3, $4)",
        [basketId.id, shoeId, price.rows[0].price, 1]
      );
    } else {
      await poo.query(
        "UPDATE shopping_basket_item SET qty = qty + 1 AND price = price * (qty + 1) WHERE shoe_id = $1",
        [shoeId]
      );
    }
  }