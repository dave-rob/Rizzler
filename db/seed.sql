INSERT INTO users (f_name, l_name, username, email, password) VALUES (
  'john','doe', 'johndoe','johndoe@mail.com',
  crypt('johnspassword', gen_salt('bf'))
);