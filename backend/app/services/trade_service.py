from models.trade import Trade
from services.near_service import call_contract_view_function

async def get_trade_history(account_id: str):
    """
    Retrieve the trade history for a user.
    """
    args = {"account_id": account_id}
    result = await call_contract_view_function("get_trade_history", args)
    return result
