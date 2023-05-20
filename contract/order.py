import json
from web3 import Web3

# Initialize endpoint URL
node_url = "https://eth-goerli.g.alchemy.com/v2/LN2JtyJNVajl1c5jOZsAfnTRixmTA95i"

# Create the node connection
web3 = Web3(Web3.HTTPProvider(node_url))

# Verify if the connection is successful
if web3.is_connected():
    print("-" * 50)
    print("Connection Successful")
    print("-" * 50)
else:
    print("Connection Failed")

caller = "0xeC78572E35a0Aaab60338b8B465A974D4874263d" #metamask id
private_key = "c2a5f9c0f9e36e115e4f583b4a5d74b8420b4b184e50f3342e059e48a6400172"  # To sign the transaction

# Initialize address nonce
nonce = web3.eth.get_transaction_count(caller)

# Initialize contract ABI and address
# with open('artifacts/contracts/stocktech.json') as f:
#     abi = json.load(f)
abi ='[{"inputs":[{"internalType":"uint256","name":"orderIDToDelete","type":"uint256"}],"name":"cancelOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ID","type":"uint256"},{"internalType":"string","name":"_TradingCode","type":"string"},{"internalType":"string","name":"_BOAccountNo","type":"string"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"takeOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getList","outputs":[{"components":[{"internalType":"uint256","name":"orderID","type":"uint256"},{"internalType":"string","name":"TradingCode","type":"string"},{"internalType":"string","name":"BOAccountNo","type":"string"},{"internalType":"string","name":"orderType","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"cost","type":"uint256"}],"internalType":"structstocktech.Order[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrder","outputs":[{"components":[{"internalType":"uint256","name":"orderID","type":"uint256"},{"internalType":"string","name":"TradingCode","type":"string"},{"internalType":"string","name":"BOAccountNo","type":"string"},{"internalType":"string","name":"orderType","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"cost","type":"uint256"}],"internalType":"structstocktech.Order","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrderAndHash","outputs":[{"components":[{"internalType":"uint256","name":"orderID","type":"uint256"},{"internalType":"string","name":"TradingCode","type":"string"},{"internalType":"string","name":"BOAccountNo","type":"string"},{"internalType":"string","name":"orderType","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"cost","type":"uint256"}],"internalType":"structstocktech.Order","name":"","type":"tuple"},{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}]'
contract_address = "0xfEA728BAF8C8FD987112E06F337CFc2120227a18" #after deployment

# Create smart contract instance
contract = web3.eth.contract(address=contract_address, abi=abi)
#print(contract)
#print(dir(contract.functions.takeOrder))

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
