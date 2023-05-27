import requests
import math, random,inspect
import json
from django.db import connection
from accountManagement.sendOtp import *
greenweburl = "http://api.greenweb.com.bd/api.php"
from django.db import models
from accountManagement.authMiddle import *
from accountManagement.verifyPhone import *
from dataProcessing.market_data import *

class portfolio:
    def __init__(self, tradeCode,BuyingPrice,buyingDate,volume,LTP):
        self.tradeCode = tradeCode
        self.BuyingPrice = BuyingPrice
        self.buyingDate = buyingDate
        self.volume = volume
        self.LTP = LTP
        self.profit=(BuyingPrice-LTP)*volume

def fetchPortfolio(request):
    pendings=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from portfolio where bo='{result['bo']}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        arr=get_market_data()
        for row1 in rows1:
            for company in arr:
                if(company['trading_code']==row1[1]):
                    print(company)
                    pending=portfolio(row1[1],row1[3],row1[2],row1[4],company['ltp'])
                    pendings.append(pending.__dict__)
        
        return {'list':pendings}
    return {'Not Authenticated'}