from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.faculties import router as faculties_router
from app.api.characters import router as characters_router

app = FastAPI(title="Hogwarts Faculty API")

# Allow local frontend during development to call this API
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
	# Allow other local network dev hosts like http://192.168.x.x:3000
	allow_origin_regex=r"^http://192\.168\.\d+\.\d+:3000$",
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(faculties_router, prefix="/api/faculties")
app.include_router(characters_router, prefix="/api/characters")
