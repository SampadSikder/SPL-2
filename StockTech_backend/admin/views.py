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

from admin.adminAuth import *
from admin.adminLogin import *
from admin.getInvestors import *
from admin.adminJobs import *


@api_view(['POST'])
def signin(request):
    return Response(data=login(request))

@api_view(['POST'])
def auth(request):
    req=json.load(request)
    return Response(data=authorize(req['token']))

@api_view(['POST'])
def Ilist(request):
    return Response(data=getList(request))

@api_view(['POST'])
def Idelete(request):
    return Response(data=deleteInvestor(request))

@api_view(['POST'])
def IPO(request):
    return Response(data=addIPO(request))

@api_view(['POST'])
def Announcement(request):
    return Response(data=addAnnouncements(request))

@api_view(['POST'])
def Withdraw(request):
    return Response(data=handleWithdraw(request))

@api_view(['POST'])
def takeWithdraw(request):
    return Response(data=showWithdraw(request))

@api_view(['POST'])
def takeIPO(request):
    return Response(data=showIPO(request))