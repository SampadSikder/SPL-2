import requests
import math, random,inspect
import json
from django.db import connection
from accountManagement.sendOtp import *
greenweburl = "http://api.greenweb.com.bd/api.php"
from django.db import models
from accountManagement.authMiddle import *
from accountManagement.verifyPhone import *
from web3 import Web3
import os
from dotenv import load_dotenv

class order:
    def __init__(self, orderID, order_type, bo, tradeCode, price, quantity, pendingQuantity, status, date):
        self.orderID = orderID
        self.order_type = order_type
        self.bo = bo
        self.tradeCode = tradeCode
        self.price = price
        self.quantity = quantity
        self.pendingquantity = pendingQuantity
        self.status = status
        self.date = date

class transaction:
    def __init__(self, transID,orderID,bo,tradeCode,price,quantity,commission,net,order_type,time):
        self.transID = transID
        self.orderID = orderID
        self.bo = bo
        self.tradeCode = tradeCode
        self.price = price
        self.quantity = quantity
        self.order_type = order_type
        self.commission = commission
        self.net = net
        self.orderedPrice=price*quantity
        self.date=time

def fetchTransactions(request):
    pendings=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from executions where bo='{result['bo']}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        for row1 in rows1:
            pending=transaction(row1[0],row1[1],row1[2],row1[3],row1[4],row1[5],row1[6],row1[7],row1[8],row1[9])
            pendings.append(pending.__dict__)
        
        return {'list':pendings}
    return {'Not Authenticated'}

def fetchPending(request):
    pendings=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from orders where status='running' and bo='{result['bo']}';"
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            pending=order(row1[0],row1[1],row1[2],row1[3],row1[4],row1[5],row1[6],row1[7],row1[8])
            pendings.append(pending.__dict__)
       
        return {'pendings':pendings}
    
    return {'Not Authenticated'}

def fetchPast(request):
    pendings=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from orders where (status='executed' OR status='cancelled') and bo='{result['bo']}';"
        print(sql_query)
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            pending=order(row1[0],row1[1],row1[2],row1[3],row1[4],row1[5],row1[6],row1[7],row1[8])
            pendings.append(pending.__dict__)
        print(pendings)
        print(result['bo'])
        return {'past':pendings}
    return {'Not Authenticated'}

def cancel(request):
    req=json.load(request)
    result=authorize(req['token'])
    
    if(result['isAuthenticated']=='true'):
        node_url = os.getenv('API_URL')
        # Create the node connection
        web3 = Web3(Web3.HTTPProvider(node_url))
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

        Chain_id = web3.eth.chain_id
        orderID1=int(req['id'])
        orderID=web3.to_int(orderID1)
        makeOrder = contract.functions.cancelOrder(orderID).build_transaction({"chainId": Chain_id, "from": caller, "nonce": nonce})
        signed_tx = web3.eth.account.sign_transaction(makeOrder, private_key=private_key) #sign transaction
        send_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction) #send transaction
        tx_receipt = web3.eth.wait_for_transaction_receipt(send_tx) # Wait for transaction receipt
        if(tx_receipt):
            sql_query = f"UPDATE orders set status='cancelled' where orderID='{req['id']}';"
            with connection.cursor() as cursor:
                    cursor.execute(sql_query)
            message=f"Your order has been cancelled successfully.\nOrder ID: {req['id']}\n"
            sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{result['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1=cursor.fetchall()
            for row1 in rows1:
                phone=row1[0]
            phone="+88"+phone
            print(phone)
            sendMessage(phone,message)
            return {'message':"Successfully Cancelled"}
    return {'Not Authenticated'}