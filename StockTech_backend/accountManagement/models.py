from django.db import models

class BO_Account(models.Model):
    type = models.CharField(max_length=100, blank=False, default='')
    nid = models.CharField(max_length=100,blank=False, default='')
    name = models.CharField(max_length=100,blank=False, default='')
    father_husband_Name = models.CharField(max_length=100,blank=False, default='')
    motherName = models.CharField(max_length=100,blank=False, default='')
    sex = models.CharField(max_length=100,blank=False, default='')
    dob = models.DateField(max_length=100,blank=False,default='')
    passport = models.CharField(max_length=100,blank=True, default='')
    issuePlace = models.CharField(max_length=100,blank=True, default='')
    issueDate = models.DateField(max_length=100,blank=True, default='')
    expiryDate = models.DateField(max_length=100,blank=True, default='')
    occupation = models.CharField(max_length=100,blank=True, default='')
    tin = models.CharField(max_length=100,blank=True, default='')
    cycle = models.CharField(max_length=100,blank=False, default='')
    phone = models.CharField(max_length=100,blank=False, default='')
    email = models.CharField(max_length=100,blank=False, default='')
    address = models.CharField(max_length=100,blank=True, default='')
    city = models.CharField(max_length=100,blank=False, default='')
    division = models.CharField(max_length=100,blank=False, default='')
    postalCode = models.CharField(max_length=100,blank=False, default='')
    bankRoutingNo = models.CharField(max_length=100,blank=False, default='')
    bankAccountNo = models.CharField(max_length=100,blank=False, default='')
    nominee = models.BooleanField(max_length=100,blank=False,default='')
    numberOfNominee = models.IntegerField(blank=True,default='')

class Investor_Account(models.Model):
    phone = models.CharField(max_length=100,blank=False, default='')
    password = models.CharField(max_length=512,blank=False, default='')

