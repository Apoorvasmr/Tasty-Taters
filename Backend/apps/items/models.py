from unicodedata import category
from django.db import models
from telnetlib import STATUS
from cloudinary.models import CloudinaryField
from config.constants import *

# Create your models here.
class Item(models.Model):
    class Meta(object):
         db_table = 'item'

    status = models.CharField(
        'Status', blank=False, default='inactive', max_length=14, db_index=True, choices=STATUS
    )
    name = models.CharField(
        'Name', blank=False, null=False, max_length=14, db_index=True, default=''
    )
    category = models.CharField(
        'category', blank=False, null=False, default='others', max_length=14, db_index=True, choices=CATEGORIES
    )
    price = models.DecimalField(
        'price', blank=False, null=False, max_digits=14, decimal_places=2
    )
    image = CloudinaryField(
        'image', blank=False, null=False, 
    )
    created_at = models.DateTimeField(
        'Created DateTime', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated DateTime', blank=True, auto_now=True
    )