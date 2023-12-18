create table user (
  userId int not null unique auto_increment primary key,
  email text not null
  hashed_pass text not null,
  first_name text not null,
  last_name text not null,
);

create table post (
  postId int not null primary key 
  userId FOREIGN KEY REFERENCES user(userId)
  title text
  content text not null
  likes int default 0
  time_posted timestamp not null
)

-- add default values
INSERT INTO user (email, hashed_pass, first_name, last_name)
VALUES ("wendytoad@gmail.com", HASHBYTES('SHA2_512', 'supersecretpassword'), "Wendy", "Toad");

INSERT INTO post (postId, userId, title, content, time_posted)
VALUES (NEWID(), 1, null, "Hey, this is my first post. Im glad to join the community", CURRENT_TIMESTAMP);

-- add sale
-- INSERT INTO sale (sale_text)
-- VALUES ("sale text");

-- delete sale
-- UPDATE sale
-- SET time_end = CURRENT_TIMESTAMP
-- WHERE time_end IS NULL ORDER BY id DESC LIMIT 1;



