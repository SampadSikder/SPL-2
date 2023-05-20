import json
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize endpoint URL
node_url = os.getenv('API_URL')

# Create the node connection
web3 = Web3(Web3.HTTPProvider(node_url))

# Verify if the connection is successful
if web3.is_connected():
    print("-" * 50)
    print("Connection Successful")
    print("-" * 50)
else:
    print("Connection Failed")

caller= os.getenv('CALLER') #metamask id
private_key=os.getenv('PRIVATE_KEY')    # To sign the transaction

# Initialize address nonce
nonce = web3.eth.get_transaction_count(caller)

# Initialize contract ABI and address
abi =os.getenv('ABI')
contract_address= os.getenv('CONTRACT_ADDRESS')   #after deployment

# Create smart contract instance
contract = web3.eth.contract(address=contract_address, abi=abi)
# print(dir(contract.functions.takeOrder))  --> to get all the function related to contract

Chain_id = web3.eth.chain_id
makeOrder = contract.functions.takeOrder(1,"abc","1234","buy",5,10).build_transaction({"chainId": Chain_id, "from": caller, "nonce": nonce})
signed_tx = web3.eth.account.sign_transaction(makeOrder, private_key=private_key) #sign transaction
send_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction) #send transaction

tx_receipt = web3.eth.wait_for_transaction_receipt(send_tx) # Wait for transaction receipt
print("\nTransaction Details: ")
print(tx_receipt)
if(tx_receipt):
    order = contract.functions.getOrder().call() #get data
    print("\n\nOrder: ")
    print(order)
else:
    print("Order failed")
