import requests
import math, random,inspect
import json
from django.db import connection
from accountManagement.sendOtp import *
greenweburl = "http://api.greenweb.com.bd/api.php"
from django.db import models
from accountManagement.authMiddle import *
from accountManagement.verifyPhone import *
def depositOTP(request):
    print("haha")
    req=json.load(request)
    token=req['token']
    phone=req['phone']
    phone="+88"+phone
    result=authorize(token)
    if(result['isAuthenticated']=='true'):
        sendOTPmessage(phone)
        message=''
        return {message:'OTP Sent'}
    else:
        message=''
        return {message:'Not Authenticated'}

def depositConfirm(request):
    req=json.load(request)
    reqOTP=req['otp']
    reqPhone=req['phone']
    auth=authorize(req['token'])
    reqPhone="+88"+reqPhone
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
    # if(otp==reqOTP):
    #     data=1
    # else:
    #     data=0
    sql_query = f"SELECT * FROM otp;"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    date=datetime.now()
    for row in rows:
        print(row[0])
        print("database"+row[1])
        print(reqOTP)
        print("req"+reqPhone)
        if(reqOTP==row[0] and reqPhone==row[1]):
            id=str(random.randint(50000, 60000))
            sql_query = f"INSERT into deposit VALUES('{id}','{auth['bo']}','{reqPhone}',{req['amount']},'{date}');"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
            sql_query = f"SELECT balance FROM investors WHERE BoAccountNo='{auth['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            for row1 in rows1:
                balance=row1[0]
                balance+=req['amount']
                sql_query = f"UPDATE investors SET balance={balance} WHERE BoAccountNo='{auth['bo']}';"
                with connection.cursor() as cursor:
                    cursor.execute(sql_query)
            sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{auth['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1=cursor.fetchall()
            for row1 in rows1:
                phone=row1[0]
            message=f"Deposit of Tk. {req['amount']} is successful. Transaction ID is {id}. Your balance is Tk. {balance} now."
            sendMessage(phone,message)
            data='1'
            return data

    data='0'
    return data


def withdrawReq(request):
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT balance from investors where BoAccountNo='{result['bo']}';"
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            balance=row1[0]
            if(balance<req['amount']):
                message=''
                return {'message':'Invalid Amount'}
        id=str(random.randint(10000, 20000))
        date=datetime.now()
        sql_query = f"INSERT into withdraw_request VALUES ('{id}','{result['bo']}',{req['amount']},'{date}','pending');"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        return {'message':'Successfully requested'}
    else:
        return {'message':'Not Authenticated'}


class deposit:
    def __init__(self, transID, bo, phone, amount, date):
        self.transID=transID
        self.bo=bo
        self.phone=phone
        self.amount=amount
        self.date=date

class withdraw:
    def __init__(self, requestID, BO, amount,date, status):
        self.requestID=requestID
        self.BO=BO
        self.date=date
        self.amount=amount
        self.status=status

def fetchdep(request):
    deposits=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from deposit where bo='{result['bo']}';"
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            deposit1=deposit(row1[0],row1[1],row1[2],row1[3],row1[4])
            deposits.append(deposit1.__dict__)
        return {'deposits':deposits}
    return {'Not Authenticated'}

def fetchwith(request):
    withdraws=[]
    req=json.load(request)
    result=authorize(req['token'])
    if(result['isAuthenticated']=='true'):
        sql_query = f"SELECT * from withdraw_request where bo='{result['bo']}';"
        with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
        for row1 in rows1:
            withdraw1=withdraw(row1[0],row1[1],row1[2],row1[3],row1[4])
            withdraws.append(withdraw1.__dict__)
        return {'withdraws':withdraws}
    return {'Not Authenticated'}