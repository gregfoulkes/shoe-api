drop table if exists shoes CASCADE;

create table shoes (
	id serial not null primary key,
    color text not null,
    brand  text not null ,
	price int not null,
    size int not null,
    in_stock int not null

);