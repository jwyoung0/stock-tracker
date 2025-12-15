import os

def pause():
    input("\nPress ENTER to continue...")

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')
