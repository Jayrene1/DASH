DROP DATABASE IF EXISTS dash_db;
CREATE DATABASE dash_db;
USE dash_db;
CREATE TABLE sample (
    `Segment` VARCHAR(16) CHARACTER SET utf8,
    `Country` VARCHAR(24) CHARACTER SET utf8,
    `Product` VARCHAR(9) CHARACTER SET utf8,
    `Discount_Band` VARCHAR(6) CHARACTER SET utf8,
    `Units_Sold` NUMERIC(5, 1),
    `Manufacturing_Price` INT,
    `Sale_Price` INT,
    `Gross_Sales` NUMERIC(8, 1),
    `Discounts` NUMERIC(9, 3),
    `Sales` NUMERIC(10, 3),
    `COGS` NUMERIC(7, 1),
    `Profit` NUMERIC(9, 3),
    `Date` DATETIME,
    `Month_Number` INT,
    `Month_Name` VARCHAR(9) CHARACTER SET utf8,
    `Year` INT
);