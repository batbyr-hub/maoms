from django.conf import settings
from django.db import models
from django.utils.text import slugify


class PublicationCategory(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Publication(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)

    category = models.ForeignKey(
        PublicationCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    summary = models.TextField(blank=True)
    content = models.TextField(blank=True)

    cover_image = models.ImageField(
        upload_to='publications/images/',
        blank=True,
        null=True
    )
    file = models.FileField(
        upload_to='publications/files/',
        blank=True,
        null=True
    )

    published_date = models.DateField(null=True, blank=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='publications_created'
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
        related_name='publications_reviewed'
    )

    reviewed_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title