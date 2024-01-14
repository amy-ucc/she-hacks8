from flask_restful import Resource
from flask import request

fakeDatabase = {
    1:{'name':'Amy'},
    2:{'Username':'aucc'},
    3:{'pass':'1234'},
}

class User(Resource):
    # get an individual user
    def get(self, pk):
        return fakeDatabase[pk]
    
    # update a user
    def put(self, pk):
        data = request.json
        fakeDatabase[pk]['name'] = data['name']
        return fakeDatabase
    
    # delete a user
    def delete(self, pk):
        del fakeDatabase[pk]
        return fakeDatabase

