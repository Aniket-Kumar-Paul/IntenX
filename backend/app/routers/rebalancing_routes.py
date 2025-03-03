from fastapi import APIRouter, Depends
from typing import Dict
from app.utils.auth import get_current_user
from services.rebalancing_service import get_due_users, update_last_rebalance_time

router = APIRouter()

@router.post("/update-last-rebalance-time", response_model=Dict)
async def update_profile_rebalance_time(account_id: str = Depends(get_current_user)):
    """
    Create or update the user's profile.
    """
    result = await update_last_rebalance_time(account_id)
    return {"result": result}

@router.get("/get-rebalancedue-users", response_model=Dict)
async def get_rebalancedue_users():
    """
    Fetch list of users whose rebalancing is due.
    This will call the smart contract's get_due_users function.
    """
    rebalancedue_users = await get_due_users()
    return {"rebalancedue_users": rebalancedue_users}
