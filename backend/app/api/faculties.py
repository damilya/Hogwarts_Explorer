from fastapi import APIRouter

router = APIRouter()

FACULTIES = [
    {
        "name": "Gryffindor",
        "traits": ["Bravery", "Courage", "Chivalry"],
        "colors": ["Red", "Gold"]
    },
    {
        "name": "Slytherin",
        "traits": ["Ambition", "Cunning", "Leadership"],
        "colors": ["Green", "Silver"]
    },
    {
        "name": "Ravenclaw",
        "traits": ["Wisdom", "Intellect", "Creativity"],
        "colors": ["Blue", "Bronze"]
    },
    {
        "name": "Hufflepuff",
        "traits": ["Loyalty", "Patience", "Fairness"],
        "colors": ["Yellow", "Black"]
    }
]

@router.get("/")
def get_faculties():
    return FACULTIES
