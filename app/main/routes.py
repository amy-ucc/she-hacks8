from flask import render_template
from app.main import bp


@bp.route('/')
def index():
    return render_template('index.html') # renders the index.html file that will serve the react app
