import requests
import math, random,inspect
import json
from django.db import connection
from accountManagement.sendOtp import *
greenweburl = "http://api.greenweb.com.bd/api.php"
from django.db import models
from accountManagement.authMiddle import *
from accountManagement.verifyPhone import *

class ipo:
    def __init__(self, ipoID,code,quantity,price,issue,expiry):
        self.ipoID = ipoID
        self.code = code
        self.quantity = quantity
        self.price = price
        self.issueDate = issue
        self.expiryDate = expiry
class appliedipo:
    def __init__(self, ipoID,reqID,code,appliedQuantity,allocatedQuantity,price,apply,status):
        self.ipoID = ipoID
        self.reqID = reqID
        self.code = code
        self.appliedQuantity = appliedQuantity
        self.allocatedQuantity = allocatedQuantity
        self.price = price
        self.applyDate = apply
        self.status = status


def fetchIPO(request):
    ipos=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from ipo where status='running';"
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            ipo1=ipo(row1[0],row1[1],row1[3],row1[2],row1[4],row1[5])
            ipos.append(ipo1.__dict__)
        return {'ipo':ipos}
    return {'Not Authenticated'}

def fetchAppliedIPO(request):
    ipos=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from iporeq where bo='{result['bo']}';"
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            ipo1=appliedipo(row1[0],row1[1],row1[3],row1[5],row1[6],row1[4],row1[7],row1[8])
            ipos.append(ipo1.__dict__)
        return {'ipo':ipos}
    return {'Not Authenticated'}
