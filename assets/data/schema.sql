/*
MariaDB [prjctx]> describe users;
+--------------------+---------------+------+-----+---------+-------+
| Field              | Type          | Null | Key | Default | Extra |
+--------------------+---------------+------+-----+---------+-------+
| user_id            | int(11)       | YES  |     | NULL    |       |
| first_name         | varchar(100)  | YES  |     | NULL    |       |
| last_name          | varchar(100)  | YES  |     | NULL    |       |
| email              | varchar(255)  | YES  |     | NULL    |       |
| encrypted_password | varchar(1000) | NO   |     | NULL    |       |
+--------------------+---------------+------+-----+---------+-------+
*/

-- start
SHOW DATABASES;

CREATE DATABASE prjctx;

USE prjctx;

CREATE TABLE users(
    user_id int,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255)
);

SHOW TABLES;

DESCRIBE users;

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

