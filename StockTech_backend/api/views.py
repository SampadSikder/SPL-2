import sys
import os
from django.shortcuts import render

sys.path.append("..")

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from dataProcessing.market_data import *
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


@api_view(['GET'])
def market_data(request):
    return Response(data=get_market_data())

@api_view(['POST'])
def newBO(request):
    return Response(data=createBO(request))

@api_view(['POST'])
def verifyPhone(request):
    checkPhone(request)    
    return Response()

@api_view(['GET'])
def news(request):
    return Response(data=get_news())

@api_view(['GET'])
def getBank(request):
    return Response(data=retrieveBank(request))


@api_view(['GET'])
def sendOTP(request):
    sendOTPmessage()

@api_view(['GET'])
def SMA50(request):
    return Response(data=getSMA(request))

@api_view(['GET'])
def EMA50(request):
    return Response(data=getEMA(request))

@api_view(['GET'])
def STOCH(request):
    return Response(data=getSTOCH(request))

@api_view(['GET'])
def MACD(request):
    return Response(data=getMACD(request))

@api_view(['GET'])
def BB(request):
    return Response(data=getBB(request))

@api_view(['GET'])
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
    return JsonResponse(data=authorize(request))

@api_view(['GET'])
def indices(request):
    return Response(data=getIndices())

@api_view(['GET'])
def companyprofile(request):
    return JsonResponse(data=getProfile(request))

@api_view(['GET'])
def price(request):
    return Response(data=getPrice(request))

@api_view(['GET'])
def prediction(request):
    return Response(data=getPrediction(request))

@api_view(['GET'])
def companyNews(request):
    return Response(data=getNews(request))

@api_view(['GET'])
def companyFinance(request):
    return Response(data=getFinance(request))

@api_view(['GET'])
def sectorwise(request):
    return Response(data=getSectorwise())

