from fastapi import APIRouter, HTTPException
from app.services import hp_api

router = APIRouter()


@router.get("/house/{house_name}")
async def get_characters_by_house(house_name: str):
    """Proxy endpoint to fetch characters by house from the HP API.

    This keeps the backend flexible so other features can be added later.
    """
    try:
        data = await hp_api.get_characters_by_house(house_name)
        return data
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
