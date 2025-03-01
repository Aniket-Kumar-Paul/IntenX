from models.user import UserProfile
from services.near_service import call_contract_function

async def upsert_user_profile(user: UserProfile):
    """
    Creates or updates a user profile on the NEAR contract.
    """
    args = {
        "username": user.username,
        "email": user.email,
        "risk_level": user.risk_level.value,
        "rebalance_frequency": user.rebalance_frequency,
        "automatic_rebalance": user.automatic_rebalance
    }
    result = await call_contract_function("upsert_profile", args)
    return result

async def get_user_profile(account_id: str):
    """
    Retrieves the user profile from the NEAR contract.
    """
    args = {"account_id": account_id}
    result = await call_contract_function("get_profile", args)
    return result
