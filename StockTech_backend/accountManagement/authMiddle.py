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
        sql_query = f"SELECT BOAccountNo FROM Investors where BOAccountNo='{decoded_jwt['bo']}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows = cursor.fetchall()
        
        if len(rows) == 0:
            return {'bo':'None','isAuthenticated' : 'false'}
        
        return {'bo':decoded_jwt['bo'], 'isAuthenticated' : 'true'}
    except jwt.exceptions.DecodeError:
        # Return None if the JWT is invalid
        return {'bo':'None','isAuthenticated' : 'false'}