from fastapi import APIRouter, Depends
from typing import Dict
from services.user_service import upsert_user_profile, get_user_profile
from backend.app.models.user_model import UserProfile
from utils.auth import get_current_user

router = APIRouter()

@router.post("/profile", response_model=Dict)
async def create_or_update_profile(profile: UserProfile, account_id: str = Depends(get_current_user)):
    """
    Create or update the user's profile.
    """
    result = await upsert_user_profile(profile)
    return {"result": result}

@router.get("/profile", response_model=Dict)
async def fetch_profile(account_id: str = Depends(get_current_user)):
    """
    Fetch the user's profile.
    """
    result = await get_user_profile(account_id)
    return {"success": True, "profile": result}
