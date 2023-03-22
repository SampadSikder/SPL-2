import requests
import math, random
import json
greenweburl = "http://api.greenweb.com.bd/api.php"

def generateOTP() :
    digits = "0123456789"
    OTP = ""

    for i in range(4) :
        OTP += digits[math.floor(random.random() * 10)]
 
    return OTP
 


def sendOTP(otp,phone):
    message='Your OTP for StockTech is '+otp+'.'
    data = {'token':"914114232616767950065c3cba674655902f77c6a235eba15727", 
		'to':phone, 
		'message': message} 
 
    responses = requests.post(url = greenweburl, data = data) 
    response = responses.text 



def sendOTPmessage(phone):
    global otp
    otp = generateOTP()
    sendOTP(otp,phone)


def checkOTP(request):
    req=json.load(request)
    reqOTP=req['otp']
    if(otp==reqOTP):
        data=1
    else:
        data=0
    
    return data