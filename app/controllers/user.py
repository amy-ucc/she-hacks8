from flask_restful import Resource
from flask import request
from app.controllers.fakedbs import fakeDatabase
class User(Resource):
    # get an individual user
    def get(self, pk):
        return fakeDatabase[pk]
    
    # update a user
    def put(self, pk):
        data = request.json
        fakeDatabase[pk]['name'] = data['name']
        fakeDatabase[pk]['email'] = data['email']
        fakeDatabase[pk]['password'] = data['password']
        fakeDatabase[pk]['achieveVal'] = data['achieveVal']
        fakeDatabase[pk]['username'] = data['username']
        fakeDatabase[pk]['picture'] = data['picture']
        return fakeDatabase
    
    # delete a user
    def delete(self, pk):
        del fakeDatabase[pk]
        return fakeDatabase

