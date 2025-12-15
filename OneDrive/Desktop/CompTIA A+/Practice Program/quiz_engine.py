import json
import random
from utils import pause, clear_screen
from config import load_config

CONFIG = load_config()

def load_problem_set(filepath):
    """Load a JSON problem set from file."""
    with open(filepath, 'r') as f:
        return json.load(f)

def ask_question(question):
    """Ask a single question and return True if correct."""
    print("\n" + question["prompt"])

    # Shuffle choices
    choices = question["choices"][:]
    random.shuffle(choices)

    # Print options A, B, C, D...
    for i, choice in enumerate(choices):
        letter = chr(ord("A") + i)
        print(f"{letter}. {choice}")

    # Get user answer
    while True:
        user_input = input("\nYour answer: "). strip().upper()
        if user_input in [chr(ord("A") + i) for i in range(len(choices))]:
            break
        print("Invalid option, try again.")

    chosen_answer = choices[ord(user_input) - ord("A")]
    return chosen_answer == question["answer"]

def start_quiz(filepath):
    """Load a problem set and run a quiz session."""
    data = load_problem_set(filepath)
    questions = data["questions"]

    num_questions = CONFIG["questions_per_round"]

    # Don't request more questions than exist
    num_questions = min(num_questions, len(questions))

    clear_screen()

    print("\n=== Starting Quiz: {} ====".format(data.get("title", "Quiz")))
    
    # Shuffle order of questions
    random.shuffle(questions)
    
    selected = random.sample(questions, num_questions)

    score = 0
    total = len(selected)

    for q in (selected):
        if ask_question(q):
            print("Correct!\n")
            score += 1
        else:
            print(f"Incorrect! Correct answer: {q['answer']}\n")

    print(f"Quiz complete! Score: {score}/{total}\n")

    pause()