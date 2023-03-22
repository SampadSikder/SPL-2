import requests
import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response

from accountManagement.sendOtp import *

def login(request):
    req=json.load(request)
    password=req['password']
    bo=req['bo']
    print(req)
    sql_query = f"SELECT BOAccountNo,Password FROM Investors where BOAccountNo='{bo}';"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    
    if len(rows) is 0:
        message="BO account is not registered"
        data = {'message': message}
        return data

    
    row=rows[0]
    if password==row[1]:
        message="Login Successful"
        payload = {'bo': bo}
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        data = {'message': message, 'token': token}
        return data
    else:
        message="Password does not match"
        data = {'message': message}
        return data
 