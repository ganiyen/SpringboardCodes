from flask import Flask

app = Flask(__name__)

# In the greet folder, Make a simple Flask app that responds to these routes with simple text messages:

# /welcome
# Returns “welcome”
# /welcome/home
# Returns “welcome home”
# /welcome/back
# Return “welcome back”
# Once you’ve finished this, run the tests for it:

@app.route('/welcome')
def welcome():
    """Return simple welcome greeting"""

    return "welcome"

@app.route('/welcome/home')
def welcome_home():
    """Return simple welcome home greeting"""

    return "welcome home"

@app.route('/welcome/back')
def welcome_back():
    """Return simple welcome back greeting"""

    return "welcome back"