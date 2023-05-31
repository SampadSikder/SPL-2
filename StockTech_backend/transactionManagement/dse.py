from django.core.management.base import BaseCommand
import requests
import json
from django.db import connection
import jwt
from django.conf import settings
from rest_framework.response import Response
import random
from accountManagement.verifyPhone import *

class order:
    def __init__(self,id,bo,code,price,quantity,remaining):
        self.id=id
        self.bo = bo
        self.code = code
        self.price = price
        self.quantity = quantity
        self.remaining = remaining

class ipoReq:
    def __init__(self,id,bo,code,price,allocated,requested):
        self.id=id
        self.bo = bo
        self.code = code
        self.price = price
        self.allocated = allocated
        self.requested = requested

        
class Command(BaseCommand):
    help='My task'
    def executeIPO(self, *args, **options):
        ipos=[]
        time = datetime.now()
        previous_day = time - timedelta(days=1)
        datetime_string = previous_day.strftime("%Y-%m-%d")
        sql_query=f"select ipoID,quantity from ipo where status='running' and end='{datetime_string}';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        for row1 in rows1:
            sql_query=f"update ipo set status='executed' where ipoID='{row1[0]}';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
            sql_query=f"select * from iporeq where ipoID='{row1[0]}' and status='running';"
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                rows2 = cursor.fetchall()
            for row2 in rows2:
                obj=ipoReq(row2[1],row2[2],row2[3],row2[4],row2[6],row2[5])
                ipos.append(obj.__dict__)
            applications=random.uniform(0.1,1.0)
            
            for ipo in ipos:
                ipo['allocated']=int(applications*ipo['requested'])
                total=ipo['allocated']*ipo['price']
                commission=total*0.004
                total+=commission
                sql_query= f"select balance from investors where BoAccountNo='{ipo['bo']}';"
                with connection.cursor() as cursor:
                    cursor.execute(sql_query)
                    rows3 = cursor.fetchall()
                for row3 in rows3:
                    if(row3[0]>=total):
                        balance=row3[0]-total
                        print(balance)
                        sql_query=f"update investors set balance={balance} where BoAccountNo='{ipo['bo']}';"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                                        
                        sql_query=f"update iporeq set allocated={ipo['allocated']}, status='executed' where reqID='{row2[1]}';"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                        print(sql_query)
                        trxid=str(random.randint(80000,90000))
                        time = datetime.now() + timedelta(minutes=3)
                        datetime_string = time.strftime("%Y-%m-%d %H:%M:%S")
                        sql_query=f"insert into executions values ('{trxid}','{ipo['id']}','{ipo['bo']}','{ipo['code']}',{ipo['price']},{ipo['allocated']},{commission},{total},'ipo','{datetime_string}');"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                        print(sql_query)
                        sql_query=f"insert into portfolio values('{ipo['bo']}','{ipo['code']}','{datetime_string}',{ipo['price']},{ipo['allocated']},'{trxid}');"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                        message=f"IPO transaction complete.\nQuantity: {ipo['allocated']}.\nCode: {ipo['code']}.\nOrder ID:{ipo['id']}.\nDeducted amount: {total}.\nTransaction ID: {trxid}.\nNew Balance:{balance}."
                        sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{ipo['bo']}';"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                            rows5=cursor.fetchall()
                        for row5 in rows5:
                            phone=row5[0]
                        sendMessage(phone,message)

            

    def execute(self, *args, **options):
        sql_query="select * from orders where status='running' and type='buy';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        buy=[]
        for row1 in rows1:
            obj=order(row1[0],row1[2],row1[3],row1[4],row1[5],row1[6])
            buy.append(obj.__dict__)
        sql_query="select * from orders where status='running' and type='sell';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        sell=[]
        for row1 in rows1:
            obj=order(row1[0],row1[2],row1[3],row1[4],row1[5],row1[6])
            sell.append(obj.__dict__)
        choice=random.randint(0,2)
        print(buy)
        print(sell)
        if(choice==1):
            len1=len(buy)
            if(len1>0):
                selected=random.randint(0,len1-1)
                remaining=buy[selected]['remaining']
                quantity=random.randint(0,remaining)
                if(quantity>0):
                    total=quantity*buy[selected]['price']
                    commission=total*0.004
                    total+=commission
                    bo=buy[selected]['bo']
                    sql_query= f"select balance from investors where BoAccountNo='{bo}';"
                    #print(sql_query)
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                        rows1 = cursor.fetchall()
                    for row1 in rows1:
                        if(row1[0]>=total):
                            balance=row1[0]-total
                            sql_query=f"update investors set balance={balance} where BoAccountNo='{buy[selected]['bo']}';"
                            with connection.cursor() as cursor:
                                cursor.execute(sql_query)
                            remaining-=quantity
                            sql_query=f"update orders set remaining={remaining} where orderID='{buy[selected]['id']}';"
                            with connection.cursor() as cursor:
                                cursor.execute(sql_query)
                            trxid=str(random.randint(80000,90000))
                            time = datetime.now() + timedelta(minutes=3)
                            datetime_string = time.strftime("%Y-%m-%d %H:%M:%S")
                            sql_query=f"insert into executions values ('{trxid}','{buy[selected]['id']}','{buy[selected]['bo']}','{buy[selected]['code']}',{buy[selected]['price']},{quantity},{commission},{total},'buy','{datetime_string}');"
                            with connection.cursor() as cursor:
                                cursor.execute(sql_query)
                            if(remaining==0):
                                sql_query=f"update orders set status='executed' where orderID='{buy[selected]['id']}';"
                                with connection.cursor() as cursor:
                                    cursor.execute(sql_query)
                            sql_query=f"insert into portfolio values('{buy[selected]['bo']}','{buy[selected]['code']}','{datetime_string}',{buy[selected]['price']},{quantity},'{trxid}');"
                            with connection.cursor() as cursor:
                                cursor.execute(sql_query)
                            message=f"Buy transaction complete.\nQuantity: {quantity}.\nCode: {buy[selected]['code']}.\nOrder ID:{buy[selected]['id']}.\nDeducted amount: {total}.\nTransaction ID: {trxid}.\nNew Balance:{balance}."
                            sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{buy[selected]['bo']}';"
                            with connection.cursor() as cursor:
                                cursor.execute(sql_query)
                                rows1=cursor.fetchall()
                            for row1 in rows1:
                                phone=row1[0]
                            sendMessage(phone,message)
        elif(choice==2):
            len1=len(sell)
            if(len1>0):
                selected=random.randint(0,len1-1)
                remaining=sell[selected]['remaining']
                quantity=random.randint(0,remaining)
                if(quantity>0):
                    total=quantity*sell[selected]['price']
                    commission=total*0.004
                    total-=commission
                    bo=sell[selected]['bo']
                    balance=row1[0]+total
                    sql_query=f"update investors set balance={balance} where BoAccountNo='{sell[selected]['bo']}';"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                    remaining-=quantity
                    sql_query=f"update orders set remaining={remaining} where orderID='{sell[selected]['id']}';"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                    trxid=str(random.randint(80000,90000))
                    time = datetime.now() + timedelta(minutes=3)
                    datetime_string = time.strftime("%Y-%m-%d %H:%M:%S")
                    sql_query=f"insert into executions values ('{trxid}','{sell[selected]['id']}','{sell[selected]['bo']}','{sell[selected]['code']}',{sell[selected]['price']},{quantity},{commission},{total},'sell','{datetime_string}');"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                    if(remaining==0):
                        sql_query=f"update orders set status='executed' where orderID='{sell[selected]['id']}';"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                    message=f"Sell transaction complete.\nQuantity: {quantity}.\nCode: {sell[selected]['code']}.\nOrder ID:{sell[selected]['id']}.\nAdded amount: {total}.\nTransaction ID: {trxid}.\nNew Balance:{balance}."
                    sql_query=f"select FirstHolderPhone from boaccount where BOAccountNo='{sell[selected]['bo']}';"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                        rows1=cursor.fetchall()
                    for row1 in rows1:
                        phone=row1[0]
                    sendMessage(phone,message)
                    sql_query=f"select volume, transID from portfolio where bo='{buy[selected]['bo']}' and code='{buy[selected]['code']}';"
                    with connection.cursor() as cursor:
                        cursor.execute(sql_query)
                        rows2=cursor.fetchall()
                    for row2 in rows2:
                        if(quantity>0):
                            if(row2[0]<=quantity):
                                sql_query=f"delete from portfolio where transID='{row2[1]}';"
                                with connection.cursor() as cursor:
                                    cursor.execute(sql_query)
                                quantity=quantity-row2[0]
                            else:
                                sql_query=f"update portfolio set volume={row2[0]-quantity} where transID='{row2[1]}';"
                                with connection.cursor() as cursor:
                                    cursor.execute(sql_query)
                                quantity=quantity-row2[0]


def executeImmediate():
        sql_query="select * from orders where status='running' and type='buy';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        buy=[]
        for row1 in rows1:
            obj=order(row1[0],row1[2],row1[3],row1[4],row1[5],row1[6])
            buy.append(obj.__dict__)
        sql_query="select * from orders where status='running' and type='sell';"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            rows1 = cursor.fetchall()
        sell=[]
        for row1 in rows1:
            obj=order(row1[0],row1[2],row1[3],row1[4],row1[5],row1[6])
            sell.append(obj.__dict__)

        if(len(buy)>0 and len(sell)>0):
            
            for buy1 in buy:
                for sell1 in sell:
                    if((buy1['code']==sell1['code']) and (buy1['price']==sell1['price']) and (buy1['bo']!=sell1['bo']) and (buy1['remaining']>sell1['remaining'])):
                        buy1['remaining']-=sell1['remaining']
                        quantity=sell1['remaining']
                        sell1['remaining']=0
                        sell1['status']='executed'
                        sql_query=f"update orders set status='executed' where orderID='{sell1['id']}';"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                        trxid=str(random.randint(80000,90000))
                        trxid1=str(random.randint(80000,90000))
                        time = datetime.now() + timedelta(minutes=3)
                        datetime_string = time.strftime("%Y-%m-%d %H:%M:%S")
                        total=quantity*sell1['price']
                        commission=total*0.004
                        selltotal-=commission
                        buytotal+=commission
                        sql_query=f"insert into executions values ('{trxid}','{sell1['id']}','{sell1['bo']}','{sell1['code']}',{sell1['price']},{quantity},{commission},{selltotal},'sell','{datetime_string}');"
                        sql_query1=f"insert into executions values ('{trxid1}','{buy1['id']}','{buy1['bo']}','{sell1['code']}',{sell1['price']},{quantity},{commission},{buytotal},'buy','{datetime_string}');"
                        with connection.cursor() as cursor:
                            cursor.execute(sql_query)
                            cursor.execute(sql_query1)


