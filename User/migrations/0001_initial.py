# Generated by Django 4.2.2 on 2023-06-06 05:51

import User.models
import datetime
from django.conf import settings
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('PatientID', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=50, null=True)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('c_age', models.CharField(blank=True, max_length=3, null=True)),
                ('Gender', models.CharField(choices=[('FEMALE', 'Female'), ('MALE', 'Male')], default='FEMALE', max_length=20)),
                ('Weight', models.CharField(blank=True, max_length=39, null=True)),
                ('Height', models.CharField(blank=True, max_length=39, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('UserID', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('email_verification_code', models.CharField(blank=True, max_length=50, null=True)),
                ('email_verification_timestamp', models.DateTimeField(blank=True, null=True)),
                ('new_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('Img', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('PhoneNumber', models.CharField(default='01001234567', max_length=11)),
                ('hospital_name', models.CharField(blank=True, max_length=50, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('password_reset_used', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', User.models.CustomUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='X_ray',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Img', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('Bone_age', models.CharField(max_length=50)),
                ('Diagnosis', models.CharField(blank=True, max_length=50, null=True)),
                ('Notes', models.CharField(blank=True, max_length=50, null=True)),
                ('Date', models.DateField(default=datetime.datetime(2023, 6, 6, 5, 51, 47, 755840, tzinfo=datetime.timezone.utc))),
                ('PatientID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='User.patient')),
            ],
        ),
        migrations.AddField(
            model_name='patient',
            name='DoctorID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
