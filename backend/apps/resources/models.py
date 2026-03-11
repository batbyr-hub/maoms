from django.conf import settings
from django.db import models


class ResourceCategory(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Resource(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    title = models.CharField(max_length=255)

    category = models.ForeignKey(
        ResourceCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    description = models.TextField(blank=True)
    file = models.FileField(upload_to='resources/files/')

    is_public = models.BooleanField(default=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='resources_created'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )

    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='resources_reviewed'
    )

    reviewed_at = models.DateTimeField(null=True, blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title