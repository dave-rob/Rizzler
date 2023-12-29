DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS info;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS messages;

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
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    personality varchar(50),
    bio TEXT,
    gender varchar(10),
    interest varchar(10),
    pic text
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES users(id) ON DELETE CASCADE,
    user2_id INT REFERENCES users(id) ON DELETE CASCADE,
    user1_likes BOOLEAN,
    user2_likes BOOLEAN,
    match BOOLEAN
);

CREATE TABLE messages(
    id SERIAL PRIMARY Key,
    match_id int REFERENCES matches(id) ON DELETE CASCADE,
    user_id int REFERENCES users(id) ON DELETE CASCADE,
    message text
);