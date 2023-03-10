# Generated by Django 4.1.4 on 2022-12-15 01:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('board', models.CharField(max_length=8)),
                ('year', models.IntegerField()),
                ('washes', models.IntegerField(default=0)),
                ('fix', models.IntegerField(default=0)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.employee')),
            ],
        ),
    ]
