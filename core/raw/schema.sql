/*

+------------------+
| Tables_in_PrjctX |
+------------------+
| Artist           |
| Artwork          |
| Collection       |
| CollectionItems  |
| Collector        |
| User             |
+------------------+

*/

-- check the default database
SELECT DATABASE();

CREATE DATABASE IF NOT EXISTS PrjctX;

USE PrjctX;

CREATE TABLE IF NOT EXISTS Artist (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  bio VARCHAR(512),
  dob DATE NOT NULL DEFAULT '0000-00-00',
  country VARCHAR(255),
  url VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Artwork (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price INT,
  medium VARCHAR(255),
  size VARCHAR(255),
  genre VARCHAR(255),
  available BOOLEAN NOT NULL DEFAULT FALSE,
  year INT,
  url VARCHAR(255),
  artistId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (artistId) REFERENCES Artist (id)
);

CREATE TABLE IF NOT EXISTS Collector (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(255),
  dob DATE NOT NULL DEFAULT '0000-00-00',
  country VARCHAR(255),
  url VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Collection (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(512),
  collectorId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (collectorId) REFERENCES Collector (id)
);

CREATE TABLE IF NOT EXISTS CollectionItems (
  collectionId INT NOT NULL,
  artworkId INT NOT NULL,
  PRIMARY KEY (collectionId, artworkId),
  FOREIGN KEY (collectionId) REFERENCES Collection (id),
  FOREIGN KEY (artworkId) REFERENCES Artwork (id)
);

CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  dob DATE NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (id)
);

-- SHA-512
-- $: openssl passwd -6 -salt yaRab ${password}

SHOW TABLES;

/*
DESCRIBE Artist;
DESCRIBE Artwork;
DESCRIBE Collector;
DESCRIBE Collection;
DESCRIBE CollectionItems;
DESCRIBE User;
*/

QUIT

SHOW DATABASES;

-- change
ALTER TABLE user ADD encryptedPassword VARCHAR(1000);

-- drop column
ALTER TABLE user DROP COLUMN email;

--
ALTER TABLE user MODIFY COLUMN encryptedPassword VARCHAR(1000) NOT NULL;

-- delete the table
DROP TABLE user;

-- delete the db
DROP DATABASE PrjctX;
DROP DATABASE IF EXISTS PrjctX;

-- add a record
INSERT INTO user (name, email, password, dob)
VALUES ("Salaheddin AbuEin", "sabuein@gmail.co.uk", "p@$$w0rD", "1987-01-18");

-- view data
SELECT *
FROM user;
ORDER BY name;

UPDATE user
SET email = "sabuein@gmail.com"
WHERE name LIKE '%Salaheddin';

DELETE FROM user
WHERE email = "sabuein@gmail.com";