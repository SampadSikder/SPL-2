import requests
import math, random
import json
from datetime import datetime, timedelta
from django.db import connection
import os
greenweburl = "http://api.greenweb.com.bd/api.php"

def generateOTP() :
    digits = "0123456789"
    OTP = ""

    for i in range(4) :
        OTP += digits[math.floor(random.random() * 10)]
 
    return OTP
 


def sendOTP(otp,phone):
    message='Your OTP for StockTech is '+otp+'.'
    data = {'token':os.getenv('OTP_TOKEN'), 
		'to':phone, 
		'message': message} 
    
    responses = requests.post(url = greenweburl, data = data)
    print(data) 
    response = responses.text 



def sendOTPmessage(phone):
    global otp
    otp = generateOTP()
    expiration_time = datetime.now() + timedelta(minutes=3)
    sql_query = "insert into otp values ('"
    sql_query += otp
    sql_query += "','"
    sql_query += phone
    sql_query += "','"
    datetime_string = expiration_time.strftime("%Y-%m-%d %H:%M:%S")
    sql_query+=datetime_string
    sql_query+="');"
    print(sql_query)
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
    sendOTP(otp,phone)


def checkOTP(request):
    req=json.load(request)
    reqOTP=req['otp']
    reqPhone=req['phone']
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

    for row in rows:
        print("req"+reqPhone)
        print(row[1])
        if(reqOTP==row[0] and reqPhone==row[1]):
            data='1'
            return data

    data='0'
    return data


