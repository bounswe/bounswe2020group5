from django.db import models

class SocialDocs(models.Model):
    email = models.CharField(max_length=250)
    social_provider = models.CharField(max_length=50)