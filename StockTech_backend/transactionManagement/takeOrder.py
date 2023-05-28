import json
from web3 import Web3
import os
import requests
import math, random,inspect
import json
from django.db import connection
from accountManagement.sendOtp import *
from django.db import models
from accountManagement.authMiddle import *
from accountManagement.verifyPhone import *


def takeOrder(request):
    req=json.load(request)
    token=req['token']
    auth=authorize(token)
    if(auth['isAuthenticated']=='true'):
        # Initialize endpoint URL
        node_url = os.getenv('API_URL')

        # Create the node connection
        web3 = Web3(Web3.HTTPProvider(node_url))
        orderType=req['type']
        bo=auth['bo']
        code=req['code']
        quantity1=req['quantity']
        quantity=web3.to_int(quantity1)
        price1=req['price']*100
        price2=int(price1)
        price=web3.to_int(price2)
        orderID1=random.randint(60000, 70000)
        orderID=web3.to_int(orderID1)

        # Verify if the connection is successful
        if web3.is_connected():
            print("-" * 50)
            print("Connection Successful")
            print("-" * 50)
        else:
            print("Connection Failed")

        caller= os.getenv('CALLER_2') #metamask id
        private_key=os.getenv('PRIVATE_KEY_2')    # To sign the transaction

        # Initialize address nonce
        nonce = web3.eth.get_transaction_count(caller)

       
        # Initialize contract ABI and address
        abi =os.getenv('ABI')
        contract_address= os.getenv('CONTRACT_ADDRESS')   #after deployment

        # Create smart contract instance
        contract = web3.eth.contract(address=contract_address, abi=abi)
        # print(dir(contract.functions.takeOrder))  --> to get all the function related to contract

        Chain_id = web3.eth.chain_id

        makeOrder = contract.functions.takeOrder(orderID,code,bo,orderType,quantity,price).build_transaction({"chainId": Chain_id, "from": caller, "nonce": nonce})
        signed_tx = web3.eth.account.sign_transaction(makeOrder, private_key=private_key) #sign transaction
        send_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction) #send transaction
        tx_receipt = web3.eth.wait_for_transaction_receipt(send_tx) # Wait for transaction receipt
        if(tx_receipt):
            order = contract.functions.getOrder().call() #get data
            arg1=float(order[5])
            arg1=arg1/100
            time = datetime.now() + timedelta(minutes=3)
            datetime_string = time.strftime("%Y-%m-%d %H:%M:%S")
            sql_query = f"INSERT into orders VALUES ('{order[0]}','{order[3]}','{order[2]}','{order[1]}',{arg1},{order[4]},{order[4]},'running','{datetime_string}');"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
            message=f"Your {order[3]} order has been placed successfully.\nOrder ID: {order[0]}.\nCode:{req['code']}.\nPrice:{req['price']}.\nQuantity:{req['quantity']}\n"
            sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{auth['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1=cursor.fetchall()
            for row1 in rows1:
                phone=row1[0]
            phone="+88"+phone
            print(phone)
            sendMessage(phone,message)
            return{'message':'Successfully ordered'}
        else:
            return{'message':'Failed order'}
    else:
        return{'message':'Not Authenticated'}

def takeIPOOrder(request):
    req=json.load(request)
    token=req['token']
    auth=authorize(token)
    if(auth['isAuthenticated']=='true'):
        # Initialize endpoint URL
        node_url = os.getenv('API_URL')

        # Create the node connection
        web3 = Web3(Web3.HTTPProvider(node_url))
        orderType=req['type']
        bo=auth['bo']
        code=req['code']
        quantity1=req['quantity']
        quantity=web3.to_int(quantity1)
        price1=req['price']*100
        price2=int(price1)
        price=web3.to_int(price2)
        orderID1=random.randint(60000, 70000)
        orderID=web3.to_int(orderID1)
        
        # Verify if the connection is successful
        if web3.is_connected():
            print("-" * 50)
            print("Connection Successful")
            print("-" * 50)
        else:
            print("Connection Failed")

        
        caller= os.getenv('CALLER_2') #metamask id
        private_key=os.getenv('PRIVATE_KEY_2')    # To sign the transaction

        # Initialize address nonce
        nonce = web3.eth.get_transaction_count(caller)

        # Initialize contract ABI and address
        abi =os.getenv('ABI')
        contract_address= os.getenv('CONTRACT_ADDRESS')   #after deployment


        # Create smart contract instance
        contract = web3.eth.contract(address=contract_address, abi=abi)
        # print(dir(contract.functions.takeOrder))  --> to get all the function related to contract

        Chain_id = web3.eth.chain_id
        sql_query=f"select * from ipo where status='running';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1=cursor.fetchall()
        for row1 in rows1:
            if(row1[1]==code):
                makeOrder = contract.functions.takeOrder(orderID,code,bo,orderType,quantity,price).build_transaction({"chainId": Chain_id, "from": caller, "nonce": nonce})
                signed_tx = web3.eth.account.sign_transaction(makeOrder, private_key=private_key) #sign transaction
                send_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction) #send transaction
                tx_receipt = web3.eth.wait_for_transaction_receipt(send_tx) # Wait for transaction receipt
                if(tx_receipt):
                    order = contract.functions.getOrder().call() #get data
                    arg1=float(order[5])
                    arg1=arg1/100
                    time = datetime.now() + timedelta(minutes=3)
                    datetime_string = time.strftime("%Y-%m-%d %H:%M:%S")
                    sql_query = f"INSERT into iporeq VALUES ('{row1[0]}','{order[0]}','{order[2]}','{order[1]}',{arg1},{order[4]},0,'{datetime_string}','running');"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                    message=f"Your {order[3]} order has been placed successfully.\nOrder ID: {order[0]}.\nCode:{req['code']}.\nPrice:{req['price']}.\nQuantity:{req['quantity']}\n"
                    sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{auth['bo']}';"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                        rows1=cursor.fetchall()
                    for row1 in rows1:
                        phone=row1[0]
                    phone="+88"+phone
                    print(phone)
                    sendMessage(phone,message)
                    return{'message':'Successfully ordered'}
        else:
            return{'message':'Failed order'}
    else:
        return{'message':'Not Authenticated'}
