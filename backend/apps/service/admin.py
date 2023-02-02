from django.contrib import admin
from . import models as model

admin.site.register(model.ServiceProvided)
admin.site.register(model.ServiceCategory)
admin.site.register(model.Service)
