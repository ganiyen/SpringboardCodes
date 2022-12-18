from boggle import Boggle

from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from flask import session


app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def home_page():
    """Shows home page"""

    session["board"] = []
    session["board"] = boggle_game.make_board()
   

    return render_template('home.html', board=session["board"])