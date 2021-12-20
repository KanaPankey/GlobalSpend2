from django.contrib import admin

from .models import Envelope, Store, Transaction

admin.site.register(Envelope)
admin.site.register(Store)
admin.site.register(Transaction)
