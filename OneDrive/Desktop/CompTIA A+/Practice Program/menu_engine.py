from menus import MENUS # type: ignore
from actions import ACTIONS # type: ignore
from utils import clear_screen

def run_menu(start_menu="main"):
    menu_stack = []
    current = start_menu
    
    """Display a menu and handle user choices."""
    while True:
        clear_screen()

        menu = MENUS[current]

        print("\n" + menu["title"])
        print("-" * len(menu["title"]))

        # Display menu options
        for key, item in menu["options"].items():
            print(f"{key}. {item['label']}")

        choice = input("\nChoose an option: ").strip()

        while choice not in menu["options"]:
            print("Invalid choice. Try again.")
            choice = input("\nChoose an option: ").strip()

        selected = menu["options"][choice]

        # Back to previous menu
        if selected.get("action") == "back":
            if menu_stack:
                current = menu_stack.pop()
            else:
                current = "main"
            continue

        # Go to submenu
        if "submenu" in selected:
            menu_stack.append(current)
            current = selected["submenu"]
            continue

        # Action case
        if "action" in selected:
            action_name = selected["action"]
            action = ACTIONS.get(action_name)

            if action is None:
                print(f"[ERROR] Missing action handler: {action_name}")
                continue

            action()    # call the function
            continue