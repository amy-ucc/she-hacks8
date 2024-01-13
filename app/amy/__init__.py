from flask import Blueprint

bp = Blueprint('amy', __name__)


from app.amy import routes
