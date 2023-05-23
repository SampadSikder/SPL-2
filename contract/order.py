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

caller= os.getenv('CALLER_2') #metamask id
private_key=os.getenv('PRIVATE_KEY_2')    # To sign the transaction


#get balance
balance = web3.eth.get_balance(caller)
balance_ether = web3.from_wei(balance, 'ether')   # Convert the balance from wei to ether
print(f"Balance of address {caller}: {balance_ether} ETH")


# Initialize address nonce
nonce = web3.eth.get_transaction_count(caller)

# Initialize contract ABI and address
abi =os.getenv('ABI')
contract_address= os.getenv('CONTRACT_ADDRESS')   #after deployment

# Create smart contract instance
contract = web3.eth.contract(address=contract_address, abi=abi)
#print(dir(contract.functions.takeOrder))   --> to get all the function related to contract

Chain_id = web3.eth.chain_id

# Define variables for the function arguments
order_id = 1
trade_code = "GP"
bo_no = "123456789"
order_type = "buy"
quantity = 6
price = 10

orderInfo=contract.functions.takeOrder(order_id,trade_code,bo_no,order_type,quantity,price)
makeOrder = orderInfo.build_transaction({"chainId": Chain_id, "from": caller, "nonce": nonce, "gasPrice": web3.to_wei(25, 'gwei')})

# Get the estimated gas cost
estimated_gas = orderInfo.estimate_gas()
print(f"Estimated gas cost: {estimated_gas}")

try:
    signed_tx = web3.eth.account.sign_transaction(makeOrder, private_key=private_key) # sign transaction
    send_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction) # send transaction

    tx_receipt = web3.eth.wait_for_transaction_receipt(send_tx) # Wait for transaction receipt
    print("\nTransaction hash: ")
    # print(tx_receipt)
    print(tx_receipt["transactionHash"]).hex()  #hex er kaam test kori nai

    if tx_receipt["status"] == 1:
        order = contract.functions.getOrder().call() # get data
        print("\n\nOrder: ")
        print(order)
    else:
        print("Order failed")

except Exception as e:
    print("An error occurred during the transaction: ", e)