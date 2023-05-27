import requests
import math, random
import json
from django.db import connection
greenweburl = "http://api.greenweb.com.bd/api.php"

from accountManagement.sendOtp import *
def checkPhone(request):
    req=json.load(request)
    phone=req['phone']
    phone="+88"+phone
    sendOTPmessage(phone)
    print(phone)

def sendMessage(phone,message):
    data = {'token':"914114232616767950065c3cba674655902f77c6a235eba15727", 
		'to':phone, 
		'message': message} 
 
    responses = requests.post(url = greenweburl, data = data) 
    response = responses.text 
    print(responses)

    