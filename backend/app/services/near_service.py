from utils.near_config import account, NEAR_ACCOUNT_ID

async def call_contract_txn_function(method_name, args, gas=100000000000000, amount=0):
    """
    Call a function on a NEAR smart contract.

    Parameters:
    - method_name: The method name to call on the smart contract.
    - args: A dictionary of arguments to pass to the smart contract method.
    - gas: The amount of gas to attach to the function call (default is 100 Tgas).
    - amount: The amount of NEAR (in yoctoNEAR) to attach to the function call (default is 0).

    Returns:
    - The result of the function call.
    """
    try:
        # Ensure the account is started
        await account.startup()

        # Call the smart contract function
        result = await account.function_call(
            contract_id=NEAR_ACCOUNT_ID,
            method_name=method_name,
            args=args,
            gas=gas,
            amount=amount
        )

        return result.status
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
async def call_contract_view_function(method_name, args, gas=100000000000000, amount=0):
    """
    Call a function on a NEAR smart contract.

    Parameters:
    - method_name: The method name to call on the smart contract.
    - args: A dictionary of arguments to pass to the smart contract method.
    - gas: The amount of gas to attach to the function call (default is 100 Tgas).
    - amount: The amount of NEAR (in yoctoNEAR) to attach to the function call (default is 0).

    Returns:
    - The result of the function call.
    """
    try:
        # Ensure the account is started
        await account.startup()

        # Call the smart contract function
        result = await account.view_function(
            contract_id=NEAR_ACCOUNT_ID,
            method_name=method_name,
            args=args
        )

        return result.result
    except Exception as e:
        print(f"An error occurred: {e}")
        return None