DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL,
    userPass TEXT NOT NULL,
    userPicture TEXT NOT NULL,
    userAchievement TEXT NOT NULL
);

CREATE TABLE post (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    media TEXT NOT NULL,
    title TEXT NOT NULL,
    descript TEXT NOT NULL,
    tag TEXT NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (userId)
);
