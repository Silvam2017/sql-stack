DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE departments(
id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
department VARCHAR(30) NOT NULL,
);

CREATE TABLE role(
id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(5,0),
department_id INT
);

CREATE TABLE employee(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT
);