import requests
import math, random,inspect
import json
from django.db import connection
from accountManagement.authMiddle import *

class notification:
    def __init__(self,title,body,date):
        self.title=title
        self.body=body
        self.date=date
        
def sendNotifications(request):
    req=json.load(request)
    auth=authorize(req['token'])
    if(auth['isAuthenticated']=='true'):
        sql_query='select * from notifications'
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows = cursor.fetchall()

        notifications=[]
        for row in rows:
            obj=notification(row[0],row[1],row[2])
            notifications.append(obj.__dict__)
        return {'notifications':notifications}
    else:
        return {'notifications':'NA'}
       
