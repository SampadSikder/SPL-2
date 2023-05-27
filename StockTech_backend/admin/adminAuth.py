import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response


def authorize(token):
    try:
        # Decode the JWT using the secret key
        decoded_jwt = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        print(decoded_jwt)
        sql_query = f"SELECT email FROM admintable;"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows = cursor.fetchall()
        print(rows)
        
        if len(rows) == 0:
            return {'email':'None','isAuthenticated' : 'false'}
        for row in rows:
            if(decoded_jwt['email']==row[0]):
                return {'email':decoded_jwt['email'], 'isAuthenticated' : 'true'}
    except jwt.exceptions.DecodeError:
        # Return None if the JWT is invalid
        return {'bo':'None','isAuthenticated' : 'false'}