drop table if exists shoes,basket CASCADE;

create table shoes (
	id serial not null primary key,
    color text not null,
    brand  text not null ,
	price int not null,
    size int not null,
    in_stock int not null

);

create table basket(
    id serial not null primary key,
    shoe_id int not null UNIQUE ,
    price DECIMAL(7, 2) not null,
    qty SMALLINT DEFAULT 1,
    total DECIMAL(7, 2) not null default 0.00,
    FOREIGN KEY (shoe_id) REFERENCES shoes(id)
)



-- create table basket_item(
--   id serial not null primary key,
--   basket_id INTEGER not null,
--   shoe_id int not null,
--   price DECIMAL(7, 2) not null,
--   qty SMALLINT DEFAULT 1,
--   FOREIGN KEY (shoe_id) REFERENCES shoes(id)
--   FOREIGN KEY (basket_id) REFERENCES basket(id)
-- )

-- create table basket(
--   id serial not null primary key,
--   basket_status VARCHAR,
--   date_created date not null default now(),
--   date_checked_out date,
--   total DECIMAL(7, 2) not null default 0.00
-- )