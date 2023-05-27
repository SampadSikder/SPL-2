import requests
import math, random,inspect
import json
from django.db import connection

from accountManagement.sendOtp import *

def checkBO(request):
    req=json.load(request)
    phone=req['phone']
    bo=req['bo']

    sql_query = f"SELECT BOAccountNo FROM Investors where BOAccountNo='{bo}';"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    
    if len(rows) == 1:
        message="BO account is already registered"
        return message

    sql_query = f"SELECT FirstHolderPhone, SecondHolderPhone FROM BOAccount where BOAccountNo='{bo}';"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    
    if len(rows) == 0:
        message="BO account does not exist"
        return message
    
    row=rows[0]
    if phone==row[0]:
        sendOTPmessage(phone)
    elif phone==row[1]:
        sendOTPmessage(phone)
    else:
        message="Phone number does not match"
        return message
    message="OTP sent successfully"
    return message
    

def register(request):
    req=json.load(request)
    sql_query = f"INSERT INTO Investors values('{req['bo']}','{req['phone']}','{req['password']}',0,Null);"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
    message = "Registered Successfully"
    return message



