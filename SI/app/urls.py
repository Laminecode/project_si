from django.urls import path

from . import views

urlpatterns = [
    path('add_patient/', views.add_patient),
	path("add_medecin/", views.add_medecin),
	path("add_visite/", views.add_visite),
	path("add_vaccination/", views.add_vaccination),
	path("add_control/", views.add_control),
	path("add_chirurgie/", views.add_chirurgie),
	path("add_hospitalisation/", views.add_hospitalisation),
	path("add_analyse/", views.add_analyse),


    # get urls
    path("get_all_patient/", views.get_all_patient),
	path("get_all_medecin/", views.get_all_medecin),
    path("get_all_vaccination/", views.get_all_vaccination),
    path("get_all_hospitalisation/", views.get_all_hospitalisation),
    path("get_all_chirurgie/", views.get_all_chirurgie),
    path("get_all_control/", views.get_all_control),
    path("get_all_visite/", views.get_all_visite),
	path("get_all_analyse/", views.get_all_analyse),

	path('del_patient/', views.del_patient),
	path("del_medecin/", views.del_medecin),
	path("del_visite/", views.del_visite),
	path("del_vaccination/", views.del_vaccination),
	path("del_control/", views.del_control),
	path("del_chirurgie/", views.del_chirurgie),
	path("del_hospitalisation/", views.del_hospitalisation),
	path("del_analyse/", views.del_analyse),

	path('mod_patient/', views.mod_patient),
	path("mod_medecin/", views.mod_medecin),
	path("mod_visite/", views.mod_visite),
	path("mod_vaccination/", views.mod_vaccination),
	path("mod_control/", views.mod_control),
	path("mod_chirurgie/", views.mod_chirurgie),
	path("mod_hospitalisation/", views.mod_hospitalisation),
	path("mod_analyse/", views.mod_analyse),

	
]