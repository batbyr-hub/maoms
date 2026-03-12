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

    # Basic info
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    date_of_birth = models.DateTimeField(null=True, blank=True)

    # Education
    graduation_school = models.CharField(max_length=255, blank=True)
    graduation_year = models.PositiveIntegerField(null=True, blank=True)

    residency_graduation_year = models.PositiveIntegerField(null=True, blank=True)

    # Work
    workplace = models.CharField(max_length=255, blank=True)
    position = models.CharField(max_length=255, blank=True)

    # Professional / academic background
    professional_degree = models.CharField(max_length=255, blank=True)
    professional_degree_year = models.PositiveIntegerField(null=True, blank=True)

    academic_degree = models.CharField(max_length=255, blank=True)
    academic_degree_year = models.PositiveIntegerField(null=True, blank=True)
    thesis_topic = models.TextField(blank=True)

    # Contact
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    facebook_url = models.URLField(blank=True)

    # Portal-specific fields
    title = models.CharField(max_length=150, blank=True)
    specialization = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
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