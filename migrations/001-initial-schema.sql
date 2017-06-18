-- Up
CREATE TABLE users (id INTEGER PRIMARY KEY, login TEXT unique, password TEXT, session_id TEXT);
CREATE TABLE cards (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE);
INSERT INTO users (id, login, password, session_id) VALUES (1, 'Jack', 'password',  null);
INSERT INTO users (id, login, password, session_id) VALUES (2, 'Hanna', 'password1', null);
INSERT INTO users (id, login, password, session_id) VALUES (3, 'Eric', 'password2', null);
INSERT INTO users (id, login, password, session_id) VALUES (4, 'Jasica', 'password3', null);


-- Down
DROP TABLE users;
DROP TABLE cards;