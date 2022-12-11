from flask import Flask, request, render_template
from stories import story
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
debug = DebugToolbarExtension(app)

@app.route('/home')
def home():
    prompts = story.prompts
    return render_template("home.html", prompts=prompts)

@app.route('/story')
def show_story():

    ans = request.args
    output = story.generate(ans)

    return render_template("story.html", output=output)

