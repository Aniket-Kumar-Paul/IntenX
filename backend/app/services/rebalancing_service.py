from services.near_service import call_contract_view_function, call_contract_txn_function

async def get_due_users():
    """
    Retrieves the user profile from the NEAR contract.
    """
    args = {}
    result = await call_contract_view_function("get_due_users", args)
    return result

async def update_last_rebalance_time(account_id: str):
    """
    Retrieves the user profile from the NEAR contract.
    """
    args = {"accont_id": account_id}
    result = await call_contract_txn_function("update_last_rebalance_time", args)
    return result