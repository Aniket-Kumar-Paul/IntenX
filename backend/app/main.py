from backend.app.routers import sentiment_routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import rebalancing_routes
from routers import user_routes, asset_routes, trade_routes, auth_routes, price_routes

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
app.include_router(user_routes.router, prefix="/api/v1", tags=["User"])
app.include_router(asset_routes.router, prefix="/api/v1", tags=["Assets"])
app.include_router(trade_routes.router, prefix="/api/v1", tags=["Trades"])
app.include_router(auth_routes.router, prefix="/api/v1", tags=["Auth"])
app.include_router(rebalancing_routes.router, prefix="/api/v1", tags=["Rebalancing"])
app.include_router(sentiment_routes.router, prefix="/api/v1", tags=["Sentiments"])
app.include_router(price_routes.router, prefix="/api/v1", tags=["Prices"])

@app.get("/")
def read_root():
    return {"message": "IntenX FastAPI Backend Running"}
