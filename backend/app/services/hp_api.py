import httpx

HP_API_BASE = "https://hp-api.onrender.com/api"

async def get_characters():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{HP_API_BASE}/characters")
        response.raise_for_status()
        return response.json()


async def get_characters_by_house(house: str):
    house = house.lower()
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{HP_API_BASE}/characters/house/{house}")
        response.raise_for_status()
        return response.json()
