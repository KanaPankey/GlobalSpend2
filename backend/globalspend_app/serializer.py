from rest_framework import serializers
from .models import Envelope, Store, Transaction

class EnvelopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envelope
        fields = ['id', 'envelope_name', 'current_amt', 'fill_amt']

class StoreSerializer(serializers.ModelSerializer):
    # envelope = serializers.SlugRelatedField(many=True, queryset=Envelope.objects.all(), slug_field='envelope_name')

    class Meta:
        model = Store
        fields = ['id', 'store_name', 'store_longitude', 'store_latitude', 'amt_1', 'amt_2', 'amt_3', 'amt_4', 'envelope']

    # def to_representation(self, instance):
    #     repr = super().to_representation(instance)

    #     repr["envelope"] = instance.store.store_name

    #     return repr

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_date', 'original_transaction_amt', 'home_transaction_amt', 'is_debit_transaction', 'notes', 'envelope', 'store']

    # def to_representation(self, instance):
    #     self.fields["envelope"] = EnvelopeSerializer()

    #     repr = super().to_representation(instance)

    #     repr["store"] = instance.store.store_name

    #     return repr




    # store = serializers.SlugRelatedField(many=True, queryset=Store.objects.all(), slug_field='store')
    # envelope = serializers.SlugRelatedField(many=True, queryset=Envelope.objects.all(), slug_field='envelope_name')


    # def to_representation(self, instance):
    #     self.fields["store"] = StoreSerializer()

    #     return super().to_representation(instance)



    # envelope = serializers.PrimaryKeyRelatedField(many=True)

    # envelope = EnvelopeSerializer(many=True)

    # def to_representation(self, instance):
    #     repr = super().to_representation(instance)

    #     repr["envelope"] = instance.envelope.envelope_name

    #     return repr


    # def to_representation(self, instance):
    #     # return a serialized Envelope
    #     self.fields["envelope"] = EnvelopeSerializer()

    #     return super().to_representation(instance)