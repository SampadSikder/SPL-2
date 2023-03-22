import requests
import math, random
import json

from dataProcessing.sendOtp import *
def printPhone(request):
    req=json.load(request)
    phone=req['phone']
    phone="+88"+phone
    sendOTPmessage(phone)
    print(phone)
    