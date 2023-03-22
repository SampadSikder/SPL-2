import requests
import math, random
import json

from accountManagement.sendOtp import *
def checkPhone(request):
    req=json.load(request)
    phone=req['phone']
    phone="+88"+phone
    sendOTPmessage(phone)
    print(phone)
    