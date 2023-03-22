from django.urls import path
from .views import *

urlpatterns = [
    path('marketData/', market_data),
    path('news/', news),
    path('sendotp/',sendOTP),
    path('checkotp/',verifyOTP),
    path('indices/',indices),
    path('verifyPhone/',verifyPhone),
    path('bankRouting/',getBank),
    path('createBO/',newBO),
    path('checkBO/',verifyBO),
    path('createAccount/',signup),
    path('login/',signin),
    path('sectorwise/',sectorwise),
    path('authorize/',auth),
    path('companyprofile/',companyprofile),
    path('price/',price),
    path('companyNews/',companyNews),
    path('companyFinance/',companyFinance),
    path('SMA50/',SMA50),
    path('EMA50/',EMA50),
    path('MACD/',MACD),
    path('STOCH/',STOCH),
    path('RSI/',RSI),
    path('BB/',BB),
    path('predict/',prediction)]