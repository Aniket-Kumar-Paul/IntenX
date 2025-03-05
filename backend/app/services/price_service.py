import requests
import os
from typing import List, Dict
from backend.app.models.price_model import CoinInfo
from dotenv import load_dotenv

load_dotenv()

COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price"
COINGECKO_API_KEY = os.getenv("COINGECKO_API_KEY")

def fetch_coin_prices(coin_ids: List[str]) -> Dict[str, CoinInfo]:
    """
    Fetch current USD price, 24h USD price change, and last updated timestamp for specified coins.
    
    :param coin_ids: List of coin IDs (e.g., ['bitcoin', 'ethereum']).
    :return: Dictionary with coin IDs as keys and their corresponding CoinInfo as values.
    """
    params = {
        'ids': ','.join(coin_ids),
        'vs_currencies': 'usd',
        'include_24hr_change': 'true',
        'include_last_updated_at': 'true',
        'precision': '2'
    }
    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": COINGECKO_API_KEY
    }
    response = requests.get(COINGECKO_API_URL, headers=headers, params=params)
    response.raise_for_status()  # Raises an HTTPError for bad responses
    data = response.json()
    return {coin: CoinInfo(**info) for coin, info in data.items()}
