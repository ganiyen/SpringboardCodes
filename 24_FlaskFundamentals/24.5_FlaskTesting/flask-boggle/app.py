from boggle import Boggle

from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from flask import session


app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

boggle_game = Boggle()

# Step Three: Checking for a Valid Word

# Now that you have a form built: when the user submits the form, send the guess to your server.

# The page should not refresh when the user submits the form: this means you’ll have to make an HTTP request without refreshing the page—you can use AJAX to do that!

# Make sure you include axios so that you can easily make AJAX requests.

# Using jQuery, take the form value and using axios, make an AJAX request to send it to the server.

# On the server, take the form value and check if it is a valid word in the dictionary using the words variable in your app.py.

# Next, make sure that the word is valid on the board using the check_valid_word function from the boggle.py file.

# Since you made an AJAX request to your server, you will need to respond with JSON using the jsonify function from Flask.

# Send a JSON response which contains either a dictionary of {“result”: “ok”}, {“result”: “not-on-board”}, or {“result”: “not-a-word”}, so the front-end can provide slightly different messages depending if the word is valid or not.

# On the front-end, display the response from the backend to notify the user if the word is valid and exists on the board, if the word is invalid, or if the word does not exist at all.


@app.route('/')
def home_page():
    """Shows home page"""

    session["board"] = []
    session["board"] = boggle_game.make_board()

   
    return render_template('home.html', board=session["board"])

@app.route('/check-guess')
def checking_guess():
    # raise
    word = request.args["guess"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)
    # raise

    return jsonify({'result': response})
    






