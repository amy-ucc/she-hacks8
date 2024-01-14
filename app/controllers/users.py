from flask_restful import Resource, Api
from flask import request
from app.controllers.fakedbs import fakeDatabase

class Users(Resource):
    # get all users
    def get(self):
        return fakeDatabase
    
    # create a user
    def post(self):
        data = request.json
        userId = len(fakeDatabase.keys()) + 1
        fakeDatabase[userId] = {'name':data['name'], 'email':data['email'], 'password':data['password'], 'achieveVal':data['achieveVal'], 'username':data['username'], 'picture':data['picture']}
        return fakeDatabase[userId]    

