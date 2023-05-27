from django.urls import path


from .views import *

urlpatterns = [
    path('login/', signin),
    path('authorize/', auth),
    path('getList/', Ilist),
    path('delete/', Idelete),
    path('addipo/', IPO),
    path('addannouncement/', Announcement),
    path('handleReq/', Withdraw),
    path('reqlist/', takeWithdraw),
    path('ipolist/', takeIPO)]