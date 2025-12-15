from quiz_engine import start_quiz # type: ignore
from config import load_config, save_config
from question_editor import (
    create_question_set,
    add_question_to_set,
    edit_question,
    delete_question,
    reorder_questions
)
from utils import pause


def start_mobile_quiz():
    """Load and run the mobile devices problem set."""
    start_quiz("problems/mobile.json")

def show_about():
    print("\nThis is a quiz program created by Jeffery Young.\n")

def quit_program():
    print("\nGoodbye!\n")
    raise SystemExit

def set_questions_per_round():
    config = load_config()

    value = input("Enter number of questions per round: ")
    if not value.isdigit():
        print("Invalid number.")
        return
    
    config["questions_per_round"] = int(value)
    save_config(config)

    print("Setting saved")
    pause()

# Action map
ACTIONS = {
    "start_mobile_quiz": start_mobile_quiz,
    "show_about": show_about,
    "quit": quit_program,
    "set_questions_per_round": set_questions_per_round,    
}

ACTIONS.update({
    "create_question_set": create_question_set,
    "add_question": add_question_to_set,
    "edit_question": edit_question,
    "delete_question": delete_question,
    "reorder_questions": reorder_questions
})