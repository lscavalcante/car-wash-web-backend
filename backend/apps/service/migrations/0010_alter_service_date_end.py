# Generated by Django 4.1.4 on 2023-01-23 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0009_alter_service_options_alter_servicecategory_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='date_end',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
