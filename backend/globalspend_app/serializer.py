from rest_framework import serializers
from .models import Envelope, Store, Transaction

class EnvelopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envelope
        fields = ['id', 'envelope_name', 'current_amt', 'fill_amt']

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'store_name', 'store_longitude', 'store_latitude', 'amt_1', 'amt_2', 'amt_3', 'amt_4', 'envelope']

class TransactionSerializer(serializers.ModelSerializer):
    # store = serializers.SlugRelatedField(many=False, read_only=True, slug_field='store')
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_date', 'original_transaction_amt', 'home_transaction_amt', 'is_debit_transaction', 'notes', 'envelope', 'store']