import sys
import os
from django.shortcuts import render

sys.path.append("..")

# Create your views here.
from rest_framework import status
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from dataProcessing.market_data import *
from dataProcessing.payment import *
from dataProcessing.news import *
from accountManagement.sendOtp import *
from dataProcessing.dseindices import *
from dataProcessing.sectorwiseGL import *
from accountManagement.verifyPhone import *
from accountManagement.bankInfo import *
from accountManagement.boaccount import *
from accountManagement.signup import *
from accountManagement.signin import *
from accountManagement.authMiddle import *
from dataProcessing.companyProfile import *
from dataProcessing.technicalIndicators import *
from dataProcessing.prediction import *
from dataProcessing.notifications import *
from accountManagement.watchlist import *
from transactionManagement.depositWithdraw import *;
from transactionManagement.takeOrder import *
from accountManagement.profile import *
from transactionManagement.ipo import *
from transactionManagement.orderTransaction import *
from transactionManagement.portfolio import *

@api_view(['POST'])
def otpChange(request):
    return Response(data=changeOTP(request))

@api_view(['POST'])
def otpMatch(request):
    return Response(data=matchOTP(request))

@api_view(['POST'])
def Passwordchange(request):
    return Response(data=changePassword(request))

@api_view(['POST'])
def cancelOrder(request):
    return Response(data=cancel(request))

@api_view(['POST'])
def Pending(request):
    return Response(data=fetchPending(request))

@api_view(['POST'])
def Transaction(request):
    return Response(data=fetchTransactions(request))

@api_view(['POST'])
def Portfolio(request):
    return Response(data=fetchPortfolio(request))

@api_view(['POST'])
def Past(request):
    return Response(data=fetchPast(request))

@api_view(['POST'])
def Password(request):
    return Response(data=getPassword(request))

@api_view(['POST'])
def Balance(request):
    return Response(data=getBalance(request))

@api_view(['POST'])
def User(request):
    return Response(data=getUser(request))

@api_view(['POST'])
def getOrder(request):
    return Response(data=takeOrder(request))

@api_view(['POST'])
def getIPOOrder(request):
    return Response(data=takeIPOOrder(request))

@api_view(['GET'])
def market_data(request):
    return Response(data=get_market_data())

@api_view(['POST'])
def bullbear(request):
    return Response(data=get_bullbear(request))

@api_view(['POST'])
def createSSL(request):
    return Response(data=session_create(request))

@api_view(['POST'])
def withlist(request):
    return Response(data=fetchwith(request))

@api_view(['POST'])
def deplist(request):
    return Response(data=fetchdep(request))

@api_view(['POST'])
def ipolist(request):
    return Response(data=fetchIPO(request))

@api_view(['POST'])
def appliedipolist(request):
    return Response(data=fetchAppliedIPO(request))

@api_view(['POST'])
def getNotices(request):
    return Response(data=sendNotifications(request))

@api_view(['POST'])
def withdraw(request):
    return Response(data=withdrawReq(request))

@api_view(['POST'])
def depoOTP(request):
    return Response(data=depositOTP(request))

@api_view(['POST'])
def deposit(request):
    return Response(data=depositConfirm(request))

@api_view(['POST'])
def newBO(request):
    return Response(data=createBO(request))

@api_view(['POST'])
def verifyPhone(request):
    checkPhone(request)    
    return Response()

@api_view(['POST'])
def news(request):
    return Response(data=get_news())

@api_view(['GET'])
def getBank(request):
    return Response(data=retrieveBank(request))


@api_view(['GET'])
def sendOTP(request):
    sendOTPmessage()

@api_view(['POST'])
def SMA50(request):
    return Response(data=getSMA(request))

@api_view(['POST'])
def ssl(request):
    #response = request.POST.to_dict()
    #print(response)
    return redirect('http://localhost:5000/home')

@api_view(['POST'])
def EMA50(request):
    return Response(data=getEMA(request))

@api_view(['POST'])
def STOCH(request):
    return Response(data=getSTOCH(request))

@api_view(['POST'])
def MACD(request):
    return Response(data=getMACD(request))

@api_view(['POST'])
def BB(request):
    return Response(data=getBB(request))

@api_view(['POST'])
def RSI(request):
    return Response(data=getRSI(request))

@api_view(['POST'])
def verifyOTP(request):
    return Response(data=checkOTP(request))

@api_view(['POST'])
def verifyBO(request):
    return Response(data=checkBO(request))

@api_view(['POST'])
def signup(request):
    return Response(data=register(request))

@api_view(['POST'])
def signin(request):
    return JsonResponse(data=login(request))

@api_view(['POST'])
def auth(request):
    req=json.load(request)
    token=req['token']
    return JsonResponse(data=authorize(token))

@api_view(['GET'])
def indices(request):
    return Response(data=getIndices())

@api_view(['POST'])
def companyprofile(request):
    return Response(data=getProfile(request))

@api_view(['POST'])
def price(request):
    return Response(data=getPrice(request))

@api_view(['POST'])
def prediction(request):
    return Response(data=getPrediction(request))

@api_view(['POST'])
def companyNews(request):
    return JsonResponse(data=getNews(request))

@api_view(['POST'])
def companyFinance(request):
    return Response(data=getFinance(request))

@api_view(['GET'])
def sectorwise(request):
    return Response(data=getSectorwise())

@api_view(['POST'])
def addWatchlist(request):
    return Response(data=addWatch(request))

@api_view(['POST'])
def deleteWatchlist(request):
    return Response(data=deleteWatch(request))

@api_view(['POST'])
def selectWatchlist(request):
    return Response(data=selectWatch(request))

