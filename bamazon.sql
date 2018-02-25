DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(20,2),
  stock_quantity INT,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 1000.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XBOX One X", "Electronics", 500.01, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Big Mac", "Food", 3.50, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Whopper Jr. w/ cheese", "Food", 2.50, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jr Bacon Cheeseburger", "Food", 1.50, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LV Wallet", "Fashion", 500, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gucci Purse", "Fashion", 1000, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain America's Shield", "Fashion", 1000000000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("OJ Simpson's Glove", "Fashion", 1, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tom Brady's Cell Phone", "Electronics", 1000000, 1);
