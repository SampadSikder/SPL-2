from django.db import connection
import requests
import json

class bank:
    def __init__(self, routingNo, bankName, branch):
        self.routingNo = routingNo
        self.bankName = bankName
        self.branch = branch


def retrieveBank(request):
    req=json.load(request)
    routingNo=req['routingNo']
    sql_query = f"SELECT * FROM bank WHERE routingNo='{routingNo}';"
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
    row=rows[0]
    obj = bank(row[0],row[1],row[2])
    return obj.__dict__
