from django.db import models
from django.db.models.fields import IntegerField
from django.db.models.fields.related import ForeignKey

class Envelope(models.Model):
    envelope_name = models.CharField(max_length=30)

    # there are a few currencies with 3 and 4 decimal places, but the major ones I'll be using have a max of 2 decimal places
    current_amt = models.DecimalField(max_digits=14, decimal_places=2)
    fill_amt = models.DecimalField(max_digits=14, decimal_places=2)

    def __str__(self):
        return self.envelope_name


class Store(models.Model):
    store_name = models.CharField(max_length=30)
    store_longitude = models.DecimalField(max_digits=20, decimal_places=15)
    store_latitude = models.DecimalField(max_digits=20, decimal_places=15)

    # user chosen pre-defined typical amounts spent in a particular store
    amt_1 = models.IntegerField()
    amt_2 = models.IntegerField()
    amt_3 = models.IntegerField()
    amt_4 = models.IntegerField()
    envelope = models.ManyToManyField('Envelope', related_name='store')

    def __str__(self):
        return self.store_name


class Transaction(models.Model):
    transaction_date = models.DateField(auto_now_add=True)

    # amount in currency the transaction took place
    original_transaction_amt = models.DecimalField(max_digits=14, decimal_places=2)

    # amount in the currency used by the envelopes 
    home_transaction_amt = models.DecimalField(max_digits=14, decimal_places=2)

    # debit or deposit transaction...default is debit/purchase
    is_debit_transaction = models.BooleanField(default=True)

    notes = models.TextField(blank=True)
    envelope = models.ForeignKey('Envelope', on_delete=models.CASCADE, related_name='transaction')
    store = models.ForeignKey('Store', on_delete=models.CASCADE, related_name='transaction')

    def __str__(self):
        return '%s %s %s' % (self.transaction_date, self.store, self.original_transaction_amt)


