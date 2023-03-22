import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response


def authorize(request):
    req=json.load(request)
    token=req['token']
    try:
        # Decode the JWT using the secret key
        decoded_jwt = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        result = {'bo':decoded_jwt['bo'], 'isAuthenticated' : 'true'}
        
        # Convert the decoded JWT to a JSON object
        return result
    except jwt.exceptions.DecodeError:
        # Return None if the JWT is invalid
        return {'bo':'None','isAuthenticated' : 'false'}