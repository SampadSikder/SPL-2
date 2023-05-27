import requests
import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response
from accountManagement.authMiddle import *
from dataProcessing.market_data import *

def addWatch(request):
    req=json.load(request)
    token=req['token']
    auth=authorize(token)
    if(auth['isAuthenticated']=='true'):
        code=req['code']
        bo=auth['bo']
        sql_query="insert into watchlist values('"
        sql_query+=bo
        sql_query+="','"
        sql_query+=code
        sql_query+="');"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        return {"message":"Successfully added"}
    else:
        return {"message":"Not Authenticated"}


def deleteWatch(request):
    req=json.load(request)
    token=req['token']
    auth=authorize(token)
    if(auth['isAuthenticated']=='true'):
        code=req['code']
        bo=auth['bo']
        sql_query="delete from watchlist where bo = '"
        sql_query+=bo
        sql_query+="'and code= '"
        sql_query+=code
        sql_query+="';"
        print(sql_query)
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        return {"message":"Successfully deleted"}
    else:
        return {"message":"Not Authenticated"}
    
def selectWatch(request):
    req=json.load(request)
    token=req['token']
    auth=authorize(token)
    if(auth['isAuthenticated']=='true'):
        bo=auth['bo']
        sql_query="select code from watchlist where bo = '"
        sql_query+=bo
        sql_query+="';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        arr=get_market_data()
        arr1=[]
        for row1 in rows1:
            for company in arr:
                if(company['trading_code']==row1[0]):
                    arr1.append(company)
        return {"list":arr1}
    else:
        return {"message":"Not Authenticated"}