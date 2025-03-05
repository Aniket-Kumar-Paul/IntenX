import requests
from fastapi import APIRouter, HTTPException, Query
from typing import List
from services.price_service import fetch_coin_prices
from models.price import CoinPriceResponse

router = APIRouter()

@router.get("/prices/", response_model=CoinPriceResponse)
def get_coin_prices(coin_ids: List[str] = Query(..., description="Comma-separated list of coin IDs (e.g., 'bitcoin,ethereum')")):
    """
    Fetch current USD price, 24h USD price change, and last updated timestamp for specified coins.
    Example URL: /api/v1/prices/?coin_ids=bitcoin,ethereum
    """
    try:
        prices = fetch_coin_prices(coin_ids)
        return CoinPriceResponse(prices=prices)
    except requests.HTTPError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
