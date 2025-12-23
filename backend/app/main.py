from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.faculties import router as faculties_router
from app.api.characters import router as characters_router
import os

app = FastAPI(title="Hogwarts Faculty API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

prod_origin = os.getenv("FRONTEND_ORIGIN")
if prod_origin:
    origins.append(prod_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(faculties_router, prefix="/api/faculties")
app.include_router(characters_router, prefix="/api/characters")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/")
async def root():
    return {"message": "Hogwarts Faculty API — healthy"}
