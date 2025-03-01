import os
from dotenv import load_dotenv
from py_near.account import Account

# Load environment variables from a .env file
load_dotenv()

# Retrieve NEAR configuration from environment variables
NEAR_ACCOUNT_ID = os.getenv('NEAR_ACCOUNT_ID')
NEAR_PRIVATE_KEY = os.getenv('NEAR_PRIVATE_KEY')
NEAR_NODE_URL = os.getenv('NEAR_NODE_URL')

# Initialize the Account object
account = Account(account_id=NEAR_ACCOUNT_ID, private_key=NEAR_PRIVATE_KEY, rpc_addr=NEAR_NODE_URL)