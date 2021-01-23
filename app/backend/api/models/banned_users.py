from django.db import models

class BannedUser(models.Model):
    email = models.CharField(max_length=250)
    user = models.ForeignKey('User', on_delete=models.CASCADE)