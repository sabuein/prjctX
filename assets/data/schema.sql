/*

+------------------+
| Tables_in_prjctx |
+------------------+
| artists          |
| artworks         |
| collection_items |
| collections      |
| collectors       |
| users            |
+------------------+

+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | YES  |     | NULL    |                |
| email    | varchar(255) | YES  |     | NULL    |                |
| password | varchar(255) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

*/

-- start

CREATE DATABASE prjctx;

USE prjctx;

CREATE TABLE artists (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  bio VARCHAR(512),
  country VARCHAR(255),
  url VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE artworks (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  price INT,
  medium VARCHAR(255),
  size VARCHAR(255),
  genre VARCHAR(255),
  year INT,
  url VARCHAR(255),
  artist_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE collectors (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  country VARCHAR(255),
  url VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE collections (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(512),
  collector_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (collector_id) REFERENCES collectors (id)
);

CREATE TABLE collection_items (
  collection_id INT NOT NULL,
  artwork_id INT NOT NULL,
  PRIMARY KEY (collection_id, artwork_id),
  FOREIGN KEY (collection_id) REFERENCES collections (id),
  FOREIGN KEY (artwork_id) REFERENCES artworks (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (id)
);

-- SHA-512
-- $: openssl passwd -6 -salt yaRab ${password}

SHOW TABLES;

DESCRIBE artists;
DESCRIBE artworks;
DESCRIBE collectors;
DESCRIBE collections;
DESCRIBE collection_items;
DESCRIBE users;

QUIT

SHOW DATABASES;

-- change
ALTER TABLE users ADD encrypted_password VARCHAR(1000);

-- drop column
ALTER TABLE users DROP COLUMN email;

--
ALTER TABLE users MODIFY COLUMN encrypted_password VARCHAR(1000) NOT NULL;

-- delete the table
DROP TABLE users;

-- delete the db
DROP DATABASE prjctx;

-- add a record
INSERT INTO users (user_id, first_name, last_name, email, encrypted_password)
VALUES (1, "Salaheddin", "Abuein", "sabuein@gmail.com", "XXX");

-- view data
SELECT *
FROM users;
ORDER BY first_name;

UPDATE users
SET last_name = "AbuEin"
WHERE first_name = "Salaheddin";

DELETE FROM users
WHERE email = "sabuein@gmail.com";