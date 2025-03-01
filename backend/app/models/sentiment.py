from pydantic import BaseModel
from datetime import datetime

class Sentiment(BaseModel):
    asset_symbol: str
    sentiment_score: float  # Range from -1 (negative) to 1 (positive)
    source: str
    timestamp: datetime
