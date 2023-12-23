INSERT INTO users (f_name, l_name, username, email, password) VALUES ('John','doe', 'johndoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Janet','doe', 'janetdoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Robert','doe', 'robertdoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Bethany','doe', 'bethanydoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Rich','doe', 'richdoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Amy','doe', 'amydoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Patrick','doe', 'patrickdoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));
INSERT INTO users (f_name, l_name, username, email, password) VALUES ('Rachel','doe', 'racheldoe','johndoe@mail.com',crypt('johnspassword', gen_salt('bf')));


INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('1', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Men', 'Women', 'profile_pics/johndoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=1;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('2', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Women', 'Men', 'profile_pics/janetdoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=2;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('3', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Men', 'Women', 'profile_pics/robertdoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=3;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('4', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Women', 'Men', 'profile_pics/bethanydoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=4;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('5', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Men', 'Women', 'profile_pics/richdoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=5;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('6', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Women', 'Men', 'profile_pics/johndoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=6;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('7', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Men', 'Men', 'profile_pics/johndoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=7;
INSERT INTO info (user_id, personality, bio, gender, interest, pic) VALUES ('8', 'hungry, hopeless, tired', 'Looking for my soulmate out there.', 'Women', 'Women', 'profile_pics/johndoe.jpg');
insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=8;
-- DELETE FROM matches WHERE user2_id is NULL;