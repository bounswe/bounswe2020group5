from django.db import models

class LoginFailInfos(models.Model):
    email = models.CharField(max_length=250)
    fail_times = models.IntegerField()
    user = models.ForeignKey('User', on_delete=models.CASCADE)