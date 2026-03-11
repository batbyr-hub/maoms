from django.conf import settings
from django.db import models


class Member(models.Model):
    MEMBERSHIP_CHOICES = [
        ('resident', 'Resident'),
        ('specialist', 'Specialist'),
        ('international', 'International'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='member_profile'
    )

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    title = models.CharField(max_length=150, blank=True)
    specialization = models.CharField(max_length=255, blank=True)
    hospital = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    profile_image = models.ImageField(upload_to='members/', blank=True, null=True)
    membership_type = models.CharField(
        max_length=20,
        choices=MEMBERSHIP_CHOICES,
        default='specialist'
    )
    is_active_member = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"