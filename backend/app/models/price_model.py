from pydantic import BaseModel
from typing import Dict

class CoinInfo(BaseModel):
    usd: float
    usd_24h_change: float
    last_updated_at: int

class CoinPriceResponse(BaseModel):
    prices: Dict[str, CoinInfo]
