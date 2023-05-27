import requests
import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response
from accountManagement.authMiddle import *
from dataProcessing.market_data import *
from accountManagement.sendOtp import *
class investor:
    def __init__(self,name,BO_account_no,phone,email,password,nid,address,bank,bankNum,city,balance):
        self.name = name
        self.BO_account_no = BO_account_no
        self.phone = phone
        self.email = email
        self.password = password
        self.nid = nid
        self.address = address
        self.bank = bank
        self.bankNum = bankNum
        self.city = city
        self.balance = balance

def changeOTP(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{auth['bo']}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1=cursor.fetchall()
        for row1 in rows1:
            phone=row1[0]
        phone="+88"+phone
        sendOTPmessage(phone)
    else:
        return {"Not authenticated"}
    
def matchOTP(request):
    req=json.load(request)
    reqOTP=req['otp']
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query = f"SELECT * FROM otp;"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows = cursor.fetchall()
        cursor=connection.cursor()
        now = datetime.now()
        for row in rows:
            if(row[2]<now):
                sql_query="delete from otp where otp='"
                sql_query+=row[0]
                sql_query+="' and phone='"
                sql_query+=row[1]
                sql_query+="';"
                print(sql_query)
                cursor.execute(sql_query)

        sql_query = f"SELECT * FROM otp;"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows = cursor.fetchall()
        sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{auth['bo']}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1=cursor.fetchall()
        for row1 in rows1:
            phone=row1[0]
        phone="+88"+phone
        for row in rows:
            if(reqOTP==row[0] and phone==row[1]):
                data='1'
                return data

        data='0'
        return data
    else:
        return {"Not authenticated"}
    

def changePassword(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query=f"Update investors set Password='{req['password']}' where BOAccountNo={auth['bo']};"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        return {"message":"Successfully Updated"}
    else:
        return{"Not AUthenticated"}



def getUser(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query=f"select FirstHolderName,FirstHolderPhone,FirstHolderEmail,FirstHolderNID,FirstHolderAddress,BankName,BankAccountNo,FirstHolderCity from boaccount where BOAccountNo={auth['bo']};"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows=cursor.fetchall()
        sql_query=f"select Password,Balance from investors where BOAccountNo={auth['bo']};"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1=cursor.fetchall()
        row=rows[0]
        row1=rows1[0]
        obj=investor(row[0],auth['bo'],row[1],row[2],row1[0],row[3],row[4],row[5],row[6],row[7],row1[1])
        return {"user":obj.__dict__}
    else:
        return{"message":"Not Authenticated"}
    
def getBalance(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query=f"select Balance from investors where BOAccountNo={auth['bo']};"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1=cursor.fetchall()
        row1=rows1[0]
        return {"balance":row1[0]}
    else:
        return{"message":"Not Authenticated"}
    
def getPassword(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query=f"select Password from investors where BOAccountNo={auth['bo']};"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1=cursor.fetchall()
        row1=rows1[0]
        return {"password":row1[0]}
    else:
        return{"message":"Not Authenticated"}