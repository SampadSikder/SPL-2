import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response
from admin.adminAuth import *
import random,datetime
from accountManagement.verifyPhone import *

def handleWithdraw(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        id=str(random.randint(10000, 20000))
        sql_query=f"Update withdraw_request set status='{req['decision']}' where reqid='{req['id']}';"
        print(sql_query)
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        if(req['decision']=='accepted'):
            sql_query = f"SELECT balance FROM investors WHERE BoAccountNo='{req['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1 = cursor.fetchall()
            for row1 in rows1:
                balance=row1[0]
                balance-=req['amount']
                sql_query = f"UPDATE investors SET balance={balance} WHERE BoAccountNo='{req['bo']}';"
                with connection.cursor() as cursor:
                    cursor.execute(sql_query)
            sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{req['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1=cursor.fetchall()
            for row1 in rows1:
                phone=row1[0]
            message=f"Withdrawal of Tk. {req['amount']} is successful.\nTransaction ID: {req['id']}.\nNew balance balance: Tk. {balance}."
            sendMessage(phone,message)
        else:
            sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{req['bo']}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows1=cursor.fetchall()
            for row1 in rows1:
                phone=row1[0]
            message=f"Withdrawal of Tk. {req['amount']} is rejected.\nRequest ID: {req['id']}."
            sendMessage(phone,message)
        
    else:
        return {"Not Authenticated"}


class withdrawal:
    def __init__(self,id,bo,amount,date,status):
        self.id = id
        self.bo=bo
        self.status = status
        self.date = date
        self.amount = amount

def showWithdraw(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        withdraws=[]
        sql_query = f"SELECT * from withdraw_request;"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        for row1 in rows1:
            withdraw1=withdrawal(row1[0],row1[1],row1[2],row1[3],row1[4])
            withdraws.append(withdraw1.__dict__)
        return{"withdraws":withdraws}
        
    else:
        return {"Not Authenticated"}
    
class ipo:
    def __init__(self,id,code,price,quantity,start,end,status):
        self.id = id
        self.code = code
        self.price = price
        self.quantity = quantity
        self.start = start
        self.end = end
        self.status = status

def showIPO(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        ipos=[]
        sql_query = f"SELECT * from ipo where status='running';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        for row1 in rows1:
            ipo1=ipo(row1[0],row1[1],row1[2],row1[3],row1[4],row1[5],row1[6])
            ipos.append(ipo1.__dict__)
        return{"ipos":ipos}
        
    else:
        return {"Not Authenticated"}

def addIPO(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        id=str(random.randint(10000, 20000))
        sql_query=f"Insert into ipo values('{id}','{req['code']}','{req['price']}','{req['quantity']}','{req['start']}','{req['end']}','running');"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
    else:
        return {"Not Authenticated"}

def addAnnouncements(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        time = datetime.now()
        date = time.strftime("%Y/%m/%d")
        sql_query=f"Insert into notifications values('{req['title']}','{req['body']}','{date}');"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        
    else:
        return {"Not Authenticated"}