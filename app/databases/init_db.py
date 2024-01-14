import sqlite3


connection = sqlite3.connect('user.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# # First, insert a user into the users table
cur.execute("INSERT INTO users (userName, userEmail, userPass, userPicture, userAchievement) VALUES (?, ?, ?, ?, ?)",
            ('golshan.r', 'golshan.r@gmail.com', 'Helloworld123', 'path/to/picture.jpg', 'achievement1'))


connection.commit()
connection.close()


connection = sqlite3.connect('post.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# # First, insert a user into the users table
# cur.execute("INSERT INTO users (userName, userEmail, userPass, userPicture, userAchievement) VALUES (?, ?, ?, ?, ?)",
#             ('golshan.r', 'golshan.r@gmail.com', 'Helloworld123', 'path/to/picture.jpg', 'achievement1'))

# Then, insert a post into the post table
# Note: postId is autoincrement, so you don't need to insert it manually
cur.execute("INSERT INTO post (media, title, descript, tag, userId) VALUES (?, ?, ?, ?, ?)",
            ('picture', 'crocheting', 'xyz', 'crochet', '1'))

connection.commit()
connection.close()
