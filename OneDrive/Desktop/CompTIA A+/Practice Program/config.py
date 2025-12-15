import json
import os

CONFIG_PATH = "config.json"

DEFAULT_CONFIG = {
    "questions_per_round":5,
    "shuffle_questions": True,
    "shuffle_choices": True
}

def load_config():
    if not os.path.exists(CONFIG_PATH):
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG.copy()
    
    with open(CONFIG_PATH, "r") as f:
        return json.load(f)
    
def save_config(config):
    with open(CONFIG_PATH, "w") as f:
        json.dump(config, f, indent=4)