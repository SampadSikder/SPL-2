import requests
import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response
def login(request):
    req=json.load(request)
    password=req['password']
    email=req['email']
    sql_query = f"SELECT * FROM admintable where email='{email}';"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    
    if len(rows) is 0:
        message="Not Authenticated"
        data = {'message': message}
        return data

    
    row=rows[0]
    print(row[1])
    print(password)
    if password==row[1]:
        message="Login Successful"
        payload = {'email': email}
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        data = {'message': message, 'token': token}
        return data
    else:
        print('haha1')
        message="Not Authenticated"
        data = {'message': message}
        return data