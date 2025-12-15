# -------------------------------------
# MENU STRUCTURE (DATA-DRIVEN)
# -------------------------------------

MENUS = {
    "main": {
        "title": "Main Menu",
        "options": {
            "1": {"label": "Cores", "submenu": "cores"},
            "2": {"label": "Random Domain", "submenu": "random domain"},
            "3": {"label": "Quiz Editor", "submenu": "editor"},
            "4": {"label": "Settings", "submenu": "settings"},
            "5": {"label": "Quit", "action": "quit"},
        }
    },

    "cores": {
        "title": "Cores",
        "options": {
            "1": {"label": "Core 1 (220-1101)", "submenu": "core1"},
            "2": {"label": "Core 2 (220-1102)", "submenu": "core2"},
            "3": {"label": "Previous Menu", "action": "back"},
        }
    },

    "core1": {
        "title": "Core 1 (220-1101)",
        "options": {
            "1": {"label": "Mobile Devices", "action": "start_mobile_quiz"},
            "2": {"label": "Networking", "submenu": "networking"},
            "3": {"label": "Hardware", "submenu": "hardware"},
            "4": {"label": "Virtualization and Cloud Computing", "submenu": "virtualization"},
            "5": {"label": "Hardware and Network Troubleshooting", "submenu": "hardware"},
            "8": {"label": "Previous Menu", "action": "back"},
            "9": {"label": "Back to Main", "submenu": "main"},
        }
    },

    "core2": {
        "title": "Core 2 (220-1102)",
        "options": {
            "1": {"label": "Operating Systems", "submenu": "operating systems"},
            "2": {"label": "Security", "submenu": "security"},
            "3": {"label": "Software Troubleshooting", "submenu": "software"},
            "4": {"label": "Operational Procedures", "submenu": "procedures"},
            "8": {"label": "Previous", "action": "back"},
            "9": {"label": "Back to Main", "submenu": "main"},
        }    
    },
    
    "settings": {
        "title": "Settings",
        "options": {
            "1": {"label": "Set Size", "action": "set_questions_per_round"},
            "9": {"label": "Back to Main", "submenu": "main"},
        }
    },

    "editor": {
        "title": "Quiz Editor",
        "options": {
            "1": {"label": "Create new question set", "action": "create_question_set"},
            "2": {"label": "Add question", "action": "add_question"},
            "3": {"label": "Edit question", "action": "edit_question"},
            "4": {"label": "Delete question", "action": "delete_question"},
            "5": {"label": "Reorder questions", "action": "reorder_questions"},
            "6": {"label": "Back", "submenu": "main"}
        }
    },
}