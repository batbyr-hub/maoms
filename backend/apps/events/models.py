from django.conf import settings
from django.db import models


class Event(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    EVENT_TYPES = [
        ('conference', 'Conference'),
        ('workshop', 'Workshop'),
        ('webinar', 'Webinar'),
        ('training', 'Training'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()

    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    location = models.CharField(max_length=255, blank=True)
    banner = models.ImageField(upload_to='events/banners/', blank=True, null=True)
    registration_link = models.URLField(blank=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='events_created'
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
        related_name='events_reviewed'
    )

    reviewed_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title