from django.db import models

class investors(models.Model):
    BO = models.CharField(max_length=20, unique=True)
    phone = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

# class Meta:
#         app_label = 'dataProcessing'