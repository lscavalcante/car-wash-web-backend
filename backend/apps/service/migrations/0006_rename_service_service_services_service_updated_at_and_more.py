# Generated by Django 4.1.4 on 2022-12-22 01:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
        ('service', '0005_serviceprovided_created_by_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service',
            old_name='service',
            new_name='services',
        ),
        migrations.AddField(
            model_name='service',
            name='updated_at',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='service_updated_at', to='user.employee'),
        ),
        migrations.AlterField(
            model_name='service',
            name='created_at',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='service_created_at', to='user.employee'),
        ),
    ]