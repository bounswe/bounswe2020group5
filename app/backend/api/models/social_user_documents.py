from django.db import models

class SocialUserDocuments(models.Model):
    email = models.CharField(max_length=50)
    provider = models.CharField(max_length=50)