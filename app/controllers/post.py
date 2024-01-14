from flask_restful import Resource
from flask import request
from app.controllers.fakedbs import fakePostTable

class Post(Resource):
    # get an individual user
    def get(self, pk):
        return fakePostTable[pk]
    
    # update a post
    def put(self, pk):
        data = request.json
        fakePostTable[pk]['userid'] = data['userid']
        fakePostTable[pk]['title'] = data['title']
        fakePostTable[pk]['attachment'] = data['attachment']
        fakePostTable[pk]['description'] = data['description']
        fakePostTable[pk]['tag'] = data['tag']
        fakePostTable[pk]['date'] = data['date']
        return fakePostTable
    
    # delete a post
    def delete(self, pk):
        del fakePostTable[pk]
        return fakePostTable

