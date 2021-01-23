from django.db import models

class PasswordChangedDate(models.Model):
    email = models.CharField(max_length=250)
    last_change = models.CharField(max_length=50)
    user = models.ForeignKey('User', on_delete=models.CASCADE)