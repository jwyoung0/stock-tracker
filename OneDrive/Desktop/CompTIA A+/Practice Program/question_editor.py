import json
import os
from utils import pause

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROBLEM_DIR = os.path.join(BASE_DIR, "problems")

# ----------- Helpers ------------

def input_non_empty(prompt):
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Input cannot be empty.")

def choose_problem_set():
    files = [f for f in os.listdir(PROBLEM_DIR) if f.endswith(".json")]
    
    if not files:
        print("No problem sets found.")

    print("\nAvailable problem sets:")
    for i, f in enumerate(files, 1):
        print(f"{i}. {f}")

    while True:
        choice = input("Choose set number: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(files):
            break
        print("Invalid choice.")

    path = os.path.join(PROBLEM_DIR, files[int(choice) - 1])
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return path, data

def save(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def list_questions(data):
    if not data["questions"]:
        print("No questions in this set.")
        return False
    
    for i, q in enumerate(data["questions"], 1):
        preview = q["prompt"][:60].replace("\n", " ")
        print(f"{i}. {preview}...")
    return True

# ------------ Add ---------------

def create_question_set():
    title = input_non_empty("Enter set title: ")
    filename = input_non_empty("Enter filename (no .json): ") + ".json"

    path = os.path.join(PROBLEM_DIR, filename)

    if os.path.exists(path):
        print("\nA problem set with that name already exists.")
        pause()
        return
    
    data = {
        "title": title,
        "questions": []
    }

    save(path, data)

    print(f"Created new question set: {filename}")
    pause()

def add_question_to_set():
    path, data = choose_problem_set()
    if not path:
        return
    
    question = input_non_empty("\nQuestion prompt:\n")

    choices = [input_non_empty(f"Choice {c}: ") for c in "ABCD"]

    while True:
        correct = input("Correct answer (A-D): ").upper()
        if correct in "ABCD":
            break
        print("Invalid.")
        pause()

    data["questions"].append({
        "prompt": question,
        "choices": choices,
        "answer": choices[ord(correct) - 65]
    })

    save(path, data)
    print("\nQuestion added successfully.")
    pause()


# ------------- Edit -----------------

def edit_question():
    path, data = choose_problem_set()
    if not path or not list_questions(data):
        return
    
    while True:
        choice = input("Select question number to edit: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(data["questions"]):
            idx = int(choice) - 1
            break
        print("Invalid.")
        pause()

    q = data["questions"][idx]

    print("\nLeave blank to keep current value.\n")

    new_prompt = input(f"Prompt [{q['prompt'][:40]}...]: ").strip()
    if new_prompt:
        q["prompt"] = new_prompt

    for i, letter in enumerate("ABCD"):
        new = input(f"Choice {letter} [{q['choices'][i]}]: ").strip()
        if new:
            q["choices"][i] = new

    print("Correct answer:")
    c = q["answer"]
    print(f"{chr(65+i)}. {c}")

    ans = input("New correct (ENTER to keep): ").strip().upper()
    if ans == "":
        pass
    elif ans in "ABCD":
        q["answer"] = q["choices"][ord(ans) - 65]

    else:
        print("Invalid input. Keeping existing answer.")

    save(path, data)
    print("\nQuestion updated.")
    pause()

# ------------- Delete ---------------

def delete_question():
    path, data = choose_problem_set()
    if not path or not list_questions(data):
        return

    while True:
        choice = input("Delete which question #: ").strip()
        if choice.isdigit() and 1<= int(choice) <= len(data["questions"]):
            idx = int(choice) - 1
            break
        print("Invalid.")
        pause()

    confirm = input("Type DELETE to confirm: ")
    if confirm != "Delete":
        print("Cancelled.")
        return
    
    del data["questions"][idx]
    save(path, data)
    print("Questions deleted.")

# ------------ Reorder ---------------

def reorder_questions():
    path, data = choose_problem_set()
    if not path or not list_questions(data):
        return
    
    while True:
        src = input("Move questions #: ").strip()
        dst = input("New position #: ").strip()

        if (
            src.isdigit() and dst.isdigit()
            and 1 <= int(src) <= len(data["questions"])
            and 1 <= int(dst) <= len(data["questions"])
        ):
            break
        print("Invalid.")

    q = data["questions"].pop(int(src) - 1)
    data["questions"].insert(int(dst) - 1, q)

    save(path, data)
    print("Questions reordered.")
    pause()