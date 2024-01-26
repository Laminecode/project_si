from django.urls import path

from . import views

urlpatterns = [
    path('add_patient/', views.add_patient),
    
]