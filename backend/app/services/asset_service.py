from models.asset import Asset
from services.near_service import call_contract_txn_function, call_contract_view_function

async def add_or_update_asset(asset: Asset, trade_type: str):
    """
    Add or update an asset in the user's portfolio by calling the NEAR smart contract.
    Includes trade_type parameter to indicate 'buy' or 'sell'.
    """
    args = {
        "symbol": asset.symbol,
        "quantity": asset.quantity,
        "invested_amount": asset.invested_amount,
        "trade_type": trade_type  # 'buy' or 'sell'
    }
    result = await call_contract_txn_function("upsert_asset_and_update_trade_history", args)
    return result

async def get_assets(account_id: str):
    """
    Retrieve the user's portfolio by calling the NEAR smart contract.
    """
    args = {"account_id": account_id}
    result = await call_contract_view_function("get_portfolio", args)
    return result
