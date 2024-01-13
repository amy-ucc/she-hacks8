from flask import render_template, request, url_for, redirect
from app.amy import bp
from app.extensions import db
from app.models.amy import Amy


@bp.route('/', methods=('GET', 'POST'))
def index():

    return render_template('amy/index.html')
