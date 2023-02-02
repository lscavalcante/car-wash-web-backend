# Generated by Django 4.1.4 on 2022-12-22 00:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('service', '0003_service_vehicle_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicecategory',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='service_category_created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='servicecategory',
            name='updated_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='service_category_updated_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
