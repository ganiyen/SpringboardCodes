from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

responses = []

@app.route('/')
def home_page():
    """Shows home page"""

    title        = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', title=title, instructions=instructions)

@app.route(f'/questions/<int:q_num>')
def show_question(q_num):
    """Shows question"""

    # check if the question link is valid, prevent user to jump to invalid question links
    if len(responses) == q_num:
        question = satisfaction_survey.questions[q_num]
        choice0 = question.choices[0]
        choice1 = question.choices[1]
        return render_template("question.html", question=question.question, responses=responses, choice0=choice0, choice1=choice1)
    else:
        flash('Invalid question')
        return redirect(f"/questions/{len(responses)}")

@app.route('/answer', methods=["POST"])
def save_answer():
    """save user's answer. redirect to the next question or to the thank you page if all the questions have been asked"""

    answer = request.form["answer"]
    responses.append(answer)
    if len(responses) < len(satisfaction_survey.questions):
        return redirect(f"/questions/{len(responses)}")
    elif len(responses) == len(satisfaction_survey.questions):
        return redirect("/complete")

@app.route('/complete')
def survey_complelte():
    """survey complete, thank the participant"""

    return render_template("complete.html")

