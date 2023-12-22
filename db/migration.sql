DROP TABLE IF EXISTS users;

CREATE TABLE users()
    id SERIAL PRIMARY KEY,
    f_name varchar(25) NOT NULL,
    l_name varchar(25) NOT NULL,
    username varchar(30) UNIQUE NOT NULL,
    email varchar(100) NOT NULL,
    password text NOT NULL
)