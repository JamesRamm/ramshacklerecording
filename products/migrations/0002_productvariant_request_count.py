# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-08 10:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productvariant',
            name='request_count',
            field=models.IntegerField(default=0),
        ),
    ]
