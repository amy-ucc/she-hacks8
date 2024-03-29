from flask import render_template, Flask, jsonify
from flask_restful import Resource, Api
from app.api import bp

from app.controllers.user import User
from app.controllers.users import Users
from app.controllers.posts import Posts
from app.controllers.post import Post  

api = Api(bp)
    
api.add_resource(Users, '/users/')
api.add_resource(User, '/user/<int:pk>')
api.add_resource(Posts, '/posts/')
api.add_resource(Post, '/post/<int:pk>')

@bp.route('/')
def index():
    return render_template('index.html')

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]

@bp.route('/incomes')
def get_incomes():
    return jsonify(incomes)

@bp.route('/cars', methods=['GET'])
def get_cars():
    return jsonify({'cars': 'BMW', 'price': 300000})