# Generated by Django 4.1.4 on 2023-01-13 18:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0008_serviceprovided_deleted'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='service',
            options={'ordering': ['-id']},
        ),
        migrations.AlterModelOptions(
            name='servicecategory',
            options={'ordering': ['-id']},
        ),
    ]