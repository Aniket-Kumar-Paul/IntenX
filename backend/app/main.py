from app.routers import sentiment_routes, auth_routes, price_routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Config
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_routes.router, prefix="/api/v1", tags=["Auth"])
app.include_router(sentiment_routes.router, prefix="/api/v1", tags=["Sentiments"])
app.include_router(price_routes.router, prefix="/api/v1", tags=["Prices"])

@app.get("/")
def read_root():
    return {"message": "IntenX FastAPI Backend Running"}
