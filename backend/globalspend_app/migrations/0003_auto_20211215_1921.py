# Generated by Django 3.2.9 on 2021-12-15 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('globalspend_app', '0002_rename_transaction_type_transaction_is_debit_transaction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='store_latitude',
            field=models.DecimalField(decimal_places=15, max_digits=20),
        ),
        migrations.AlterField(
            model_name='store',
            name='store_longitude',
            field=models.DecimalField(decimal_places=15, max_digits=20),
        ),
    ]
