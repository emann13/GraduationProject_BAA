# Generated by Django 4.2.2 on 2023-06-06 08:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='x_ray',
            name='Date',
            field=models.DateField(default=datetime.datetime(2023, 6, 6, 8, 31, 8, 354271, tzinfo=datetime.timezone.utc)),
        ),
    ]
