from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class TradeType(str, Enum):
    buy = 'buy'
    sell = 'sell'

class Trade(BaseModel):
    asset_symbol: str
    quantity: float
    invested_amount: float  # Amount invested in this specific trade action (only for Buy trades, 0 for Sell)
    trade_type: TradeType
    timestamp: datetime
