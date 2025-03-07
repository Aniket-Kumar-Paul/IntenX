import random
from datetime import datetime
from app.models.sentiment_model import Sentiment

SOURCES = ["Twitter", "Reddit", "News", "Forums"]

def generate_random_sentiment(asset_symbol: str) -> Sentiment:
    sentiment_score = round(random.uniform(-1, 1), 2)  # Score between -1 and 1
    source = random.choice(SOURCES)
    timestamp = datetime.utcnow()

    return Sentiment(
        asset_symbol=asset_symbol,
        sentiment_score=sentiment_score,
        source=source,
        timestamp=timestamp
    )

def generate_sentiment_for_assets(assets: list[str]) -> list[Sentiment]:
    return [generate_random_sentiment(asset) for asset in assets]
