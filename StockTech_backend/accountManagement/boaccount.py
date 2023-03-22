import requests
import math, random,inspect
import json
from django.db import connection

greenweburl = "http://api.greenweb.com.bd/api.php"

class boaccount:
    def __init__(self, boaccountno,accountType,operator,cycle,fhName,fhFatHus,fhMot,fhSex,fhDob,fhNid,fhPassport,fhPassportIssuePlace,fhPassportIssueDate,fhPassportExpiryDate,fhOccupation,fhTin,fhAddress,fhCity,fhDiv,fhZip,fhPhone,fhEmail,fhPic,fhSign,shName,shFatHus,shMot,shSex,shDob,shNid,shPassport,shPassportIssuePlace,shPassportIssueDate,shPassportExpiryDate,shOccupation,shTin,shAddress,shCity,shDiv,shZip,shPhone,shEmail,shPic,shSign,routingNo,bankName,branch,bankAC,numOfNominee,cheque,payment):
        self.boaccountno=boaccountno
        self.accountType=accountType
        self.operator=operator
        self.cycle=cycle
        self.fhName=fhName
        self.fhFatHus=fhFatHus
        self.fhMot=fhMot
        self.fhSex=fhSex
        self.fhNid=fhNid
        self.fhDob=fhDob
        self.fhPassport=fhPassport
        self.fhPassportIssuePlace=fhPassportIssuePlace
        self.fhPassportIssueDate=fhPassportIssueDate
        self.fhPassportExpiryDate=fhPassportExpiryDate
        self.fhOccupation=fhOccupation
        self.fhTin=fhTin
        self.fhAddress=fhAddress
        self.fhCity=fhCity
        self.fhDiv=fhDiv
        self.fhZip=fhZip
        self.fhPhone=fhPhone
        self.fhEmail=fhEmail
        self.fhPic=fhPic
        self.fhSign=fhSign
        self.shName=shName
        self.shFatHus=shFatHus
        self.shMot=shMot
        self.shSex=shSex
        self.shNid=shNid
        self.shDob=shDob
        self.shPassport=shPassport
        self.shPassportIssuePlace=shPassportIssuePlace
        self.shPassportIssueDate=shPassportIssueDate
        self.shPassportExpiryDate=shPassportExpiryDate
        self.shOccupation=shOccupation
        self.shTin=shTin
        self.shAddress=shAddress
        self.shCity=shCity
        self.shDiv=shDiv
        self.shZip=shZip
        self.shPhone=shPhone
        self.shEmail=shEmail
        self.shPic=shPic
        self.shSign=shSign
        self.routingNo=routingNo
        self.bankName=bankName
        self.branch=branch
        self.bankAC=bankAC
        self.numOfNominee=numOfNominee
        self.cheque=cheque
        self.payment=payment

    def join_values(self):
        attrs = inspect.signature(self.__init__).parameters
        values = [f"'{getattr(self, attr)}'" if getattr(self, attr) is not "" else 'Null' for attr in attrs.keys()]
        return ','.join(values)


def generate_boaccountno():
    # Define a string containing all digits
    digits = "0123456789"
    
    # Initialize an empty string to store the number string
    boaccountno = ""
    
    # Generate random digits and append them to the number string until it reaches the desired length
    for i in range(20):
        boaccountno += random.choice(digits)
    
    return boaccountno

def createBO(request):
    req=json.load(request)
    boaccountno=generate_boaccountno()
    sql_query = f"SELECT * FROM BOAccount;"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    for row in rows:
        if(row[0]==boaccountno):
            boaccountno=generate_boaccountno()

    obj=boaccount(boaccountno,req['accountType'],req['operator'],req['cycle'],req['fhName'],req['fhFatHus'],req['fhMot'],req['fhSex'],req['fhDob'],req['fhNid'],req['fhPassport'],req['fhPassportIssuePlace'],req['fhPassportIssueDate'],req['fhPassportExpiryDate'],req['fhOccupation'],req['fhTin'],req['fhAddress'],req['fhCity'],req['fhDiv'],req['fhZip'],req['fhPhone'],req['fhEmail'],req['fhPic'],req['fhSign'],req['shName'],req['shFatHus'],req['shMot'],req['shSex'],req['shDob'],req['shNid'],req['shPassport'],req['shPassportIssuePlace'],req['shPassportIssueDate'],req['shPassportExpiryDate'],req['shOccupation'],req['shTin'],req['shAddress'],req['shCity'],req['shDiv'],req['shZip'],req['shPhone'],req['shEmail'],req['shPic'],req['shSign'],req['routingNo'],req['bankName'],req['branch'],req['bankAC'],req['numOfNominee'],req['cheque'],req['payment'])
    result=obj.join_values()
    sql_query = "insert into BOAccount values ("
    sql_query += result
    sql_query += ");"
    
    print(sql_query)

    with connection.cursor() as cursor:
        cursor.execute(sql_query)

    message="Account Created Successfully"
    fhphone='+88'+req['fhPhone']
    data = {'token':"914114232616767950065c3cba674655902f77c6a235eba15727", 
		'to':fhphone, 
		'message': 'Your BO account has been created successfully. Your BO Account number is '+boaccountno+'.'} 
    responses = requests.post(url = greenweburl, data = data) 
    
    if req['shPhone'] is not '':
        shphone='+88'+req['shPhone']
    data = {'token':"914114232616767950065c3cba674655902f77c6a235eba15727", 
		'to':shphone, 
		'message': 'Your BO account has been created successfully. Your BO Account number is '+boaccountno+'.'} 
 
    responses = requests.post(url = greenweburl, data = data) 

    return message
    
    



