DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS info;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    f_name varchar(25) NOT NULL,
    l_name varchar(25) NOT NULL,
    username varchar(30) UNIQUE NOT NULL,
    email varchar(100) NOT NULL,
    password text NOT NULL
);

CREATE TABLE info(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id),
    personality varchar(50),
    bio TEXT,
    gender varchar(10),
    interest varchar(10),
    pic text
);