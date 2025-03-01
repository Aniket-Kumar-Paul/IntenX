from fastapi import APIRouter, Depends
from typing import Dict, List
from services.asset_service import add_or_update_asset, get_assets
from models.asset import Asset
from models.trade import TradeType
from utils.auth import get_current_user

router = APIRouter()

@router.post("/asset", response_model=Dict)
async def upsert_asset(asset: Asset, trade_type: TradeType, account_id: str = Depends(get_current_user)):
    """
    Add or update an asset in the portfolio.
    """
    result = await add_or_update_asset(asset, trade_type.value)
    return {"success": True, "result": result}

@router.get("/assets", response_model=Dict)
async def fetch_assets(account_id: str = Depends(get_current_user)):
    """
    Fetch the user's portfolio.
    """
    result = await get_assets(account_id)
    return {"success": True, "assets": result}
