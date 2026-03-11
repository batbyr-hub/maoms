from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='site/logo/', blank=True, null=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.site_name