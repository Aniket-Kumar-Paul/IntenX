from fastapi import APIRouter, Depends
from typing import Dict, List
from services.asset_service import add_or_update_asset, get_assets
from app.models.asset_model import Asset
from app.models.trade_model import TradeType
from utils.auth import get_current_user

router = APIRouter()

@router.post("/asset", response_model=Dict)
async def upsert_asset(asset: Asset, trade_type: TradeType, account_id: str = Depends(get_current_user)):
    """
    Add or update an asset in the portfolio.
    """
    result = await add_or_update_asset(asset, trade_type.value)
    return {"result": result}

@router.get("/assets", response_model=Dict)
async def fetch_assets(account_id: str = Depends(get_current_user)):
    """
    Fetch the user's portfolio.
    """
    result = await get_assets(account_id)
    return {"success": True, "assets": result}
