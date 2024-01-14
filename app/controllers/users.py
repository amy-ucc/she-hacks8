from flask_restful import Resource, Api
from flask import request

fakeDatabase = {
    1:{'name':'Amy'},
    2:{'Username':'aucc'},
    3:{'pass':'1234'},
}

class Users(Resource):
    # get all users
    def get(self):
        return fakeDatabase
    
    # create a user
    def post(self):
        data = request.json
        itemId = len(fakeDatabase.keys()) + 1
        fakeDatabase[itemId] = {'name':data['name']}
        return fakeDatabase[itemId]    

