from app.extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    email = db.Column(db.String(150))
    password = db.Column(db.String(150))
    achieveVal = db.Column(db.Integer)
    username = db.Column(db.String(150))


    def __repr__(self):
        return f'<User "{self.name}">'

