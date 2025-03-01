from fastapi import APIRouter, Depends
from typing import Dict
from services.trade_service import get_trade_history
from utils.auth import get_current_user

router = APIRouter()

@router.get("/trades", response_model=Dict)
async def fetch_trade_history(account_id: str = Depends(get_current_user)):
    """
    Fetch the user's trade history.
    """
    result = await get_trade_history(account_id)
    return {"success": True, "trades": result}
