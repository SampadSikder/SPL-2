import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response
from admin.adminAuth import *

class investor:
    def __init__(self,name,email,bo,phone,bank,ac,balance,address,nid,deposit,withdraw,portfolio):
        self.name = name
        self.email = email
        self.bo = bo
        self.phone = phone
        self.bank = bank
        self.ac = ac
        self.balance = balance
        self.address = address
        self.nid = nid
        self.deposit = deposit
        self.withdraw = withdraw
        self.portfolio = portfolio

class deposit:
    def __init__(self,id,bkash,date,amount):
        self.id = id
        self.bkash = bkash
        self.date = date
        self.amount = amount

class withdrawal:
    def __init__(self,id,amount,date,status):
        self.id = id
        self.status = status
        self.date = date
        self.amount = amount

class portfolio:
    def __init__(self,code,price,quantity,date):
        self.code = code
        self.price = price
        self.quantity = quantity
        self.date=date

def getList(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        bos=[]
        investors=[]
        sql_query=f"Select BoAccountNo from investors;"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows=cursor.fetchall()
        for row in rows:
            bos.append(row[0])
        print(bos)
        for bo in bos:
            deposits=[]
            sql_query = f"SELECT * from deposit where bo='{bo}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            for row1 in rows1:
                deposit1=deposit(row1[0],row1[2],row1[4],row1[3])
                deposits.append(deposit1.__dict__)
            withdraws=[]
            sql_query = f"SELECT * from withdraw_request where bo='{bo}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            for row1 in rows1:
                withdraw1=withdrawal(row1[0],row1[2],row1[3],row1[4])
                withdraws.append(withdraw1.__dict__)
            portfolios=[]
            sql_query = f"SELECT * from portfolio where bo='{bo}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            for row1 in rows1:
                portfolio1=portfolio(row1[1],row1[3],row1[4],row1[2])
                portfolios.append(portfolio1.__dict__)
            sql_query = f"SELECT FirstHolderName,FirstHolderEmail,BOAccountNo,FirstHolderPhone,BankName,BankAccountNo,FirstHolderAddress,FirstHolderNID from boaccount where BOAccountNo='{bo}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            row1=rows1[0]
            sql_query = f"SELECT balance from investors where BOAccountNo='{bo}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            row2=rows1[0]
            balance=row2[0]
            obj=investor(row1[0],row1[1],row1[2],row1[3],row1[4],row1[5],balance,row1[6],row1[7],deposits,withdraws,portfolios)
            investors.append(obj.__dict__)
        return {"list":investors}
        
    else:
        return {"Not Authenticated"}

def deleteInvestor(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query=f"delete from investors where BoAccountNo='{req['bo']}';"
        sql_query1=f"delete from boaccount where BoAccountNo='{req['bo']}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            cursor.execute(sql_query1)
    else:
        return{"Not authenticated"}