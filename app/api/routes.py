from flask import render_template, Flask, jsonify
from flask_restful import Resource, Api
from app.api import bp

api = Api(bp)

fakeDatabase = {
    1:{'name':'Clean car'},
    2:{'name':'Write blog'},
    3:{'name':'Start stream'},
}
class Items(Resource):
    def get(self):
        return fakeDatabase

class Item(Resource):
    def get(self, pk):
        return fakeDatabase[pk]
    
api.add_resource(Items, '/items/')
api.add_resource(Item, '/item/<int:pk>')

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