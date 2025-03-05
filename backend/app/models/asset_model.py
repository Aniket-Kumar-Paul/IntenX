from pydantic import BaseModel

class Asset(BaseModel):
    symbol: str
    quantity: float  # Number of tokens (e.g., 0.5 BTC)
    invested_amount: float  # Total amount invested in this asset (e.g., 100 USD)
