from fastapi import APIRouter
from typing import List
from services.sentiment_service import generate_sentiment_for_assets
from models.sentiment import Sentiment

router = APIRouter()

@router.get("/sentiments/", response_model=List[Sentiment])
def get_sentiments(assets: str):
    """
    Fetch random sentiments for a comma-separated list of asset symbols.
    Example URL: /sentiments/?assets=BTC,ETH,SOL
    """
    asset_list = assets.split(",")
    return generate_sentiment_for_assets(asset_list)
