from django.urls import path
from rest_framework.routers import DefaultRouter

# import viewsets
from .views import StoreViewSet, EnvelopeViewSet, TransactionViewSet

router = DefaultRouter()
router.register(r'envelope', EnvelopeViewSet, basename='envelope')
router.register(r'store', StoreViewSet, basename='store')
router.register(r'transaction', TransactionViewSet, basename='transaction')
urlpatterns = router.urls