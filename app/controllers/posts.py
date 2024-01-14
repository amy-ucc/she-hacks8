from flask_restful import Resource, Api
from flask import request
from app.controllers.fakedbs import fakePostTable

class Posts(Resource):
    # get all posts
    def get(self):
        return fakePostTable
    
    # create a post
    def post(self):
        data = request.json
        postId = len(fakePostTable.keys()) + 1
        fakePostTable[postId] = {'userid':data['userid'],'title':data['title'],'attachment':data['attachment'], 'description':data['description'], 'tag':data['tag'], 'date':data['date']}
        return fakePostTable[postId]  