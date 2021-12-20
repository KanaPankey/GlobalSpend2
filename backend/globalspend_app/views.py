from rest_framework import viewsets
from .models import Envelope, Store, Transaction
from .serializer import EnvelopeSerializer, StoreSerializer, TransactionSerializer

class EnvelopeViewSet(viewsets.ModelViewSet):
    queryset = Envelope.objects.all()
    serializer_class = EnvelopeSerializer

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
