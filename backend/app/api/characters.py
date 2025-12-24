from fastapi import APIRouter, HTTPException
from app.services import hp_api
from pydantic import BaseModel
import os
import httpx
import logging

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


# Chat endpoint: forwards character + message to OpenAI and returns a reply
class ChatRequest(BaseModel):
    character: dict
    message: str


@router.post("/chat")
async def chat_with_character(req: ChatRequest):
    """Generate a chat reply as the provided character using OpenAI's Chat Completions API.

    Expects OPENAI_API_KEY in the environment. Returns JSON: { reply: str }.
    """
    openai_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    if not openai_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured on server.")

    # Build a concise system prompt that instructs the model to roleplay as the character
    system_prompt = (
        f"You are roleplaying as the Harry Potter character named {req.character.get('name')}. "
        "Use the provided character fields to inform your responses and speak in first person. "
        "Be concise and helpful, and avoid stating you are an AI. Keep the tone consistent with the character."
    )

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": req.message},
        ],
        "max_tokens": 400,
        "temperature": 0.8,
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(
                "https://api.openai.com/v1/chat/completions",
                json=payload,
                headers={"Authorization": f"Bearer {openai_key}"},
            )
            res.raise_for_status()
            data = res.json()
            # Extract assistant message
            reply = data.get("choices", [])[0].get("message", {}).get("content")
            return {"reply": reply}
    except httpx.HTTPStatusError as e:
        logging.exception("OpenAI API error")
        raise HTTPException(status_code=502, detail=f"OpenAI API error: {e.response.text}")
    except Exception as e:
        logging.exception("Chat error")
        raise HTTPException(status_code=500, detail=str(e))
