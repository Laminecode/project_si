from django.shortcuts import render
import json
from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from . import models


from datetime import datetime

TYPE_VISITE = "visite"
TYPE_CONTROL = "control"


# Create your views here.

@csrf_exempt
def add_patient(request):
	data = json.loads(request.body)

	date_naissance = datetime.strptime(data["date_naissance"], "%Y-%m-%d").date()

	patient = models.Patient(nom=data["nom"], prenom=data["prenom"],
							date_naissance=date_naissance, sexe=data["sexe"], information=data["information"])
	patient.save()
	
	return JsonResponse({})


@csrf_exempt
def add_medecin(request):
	data = json.loads(request.body)

	medecin = models.Medecin(nom=data["nom"], prenom=data["prenom"], information=data["specialite"])
	medecin.save()
	
	return JsonResponse({})

def creer_record(type, patient):
	record = models.Record(type=type, fait=False, patient=models.Patient.objects.get(pk=patient))
	record.save()
	return record
	# record.patient.set(patient)


@csrf_exempt
def add_visite(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_VISITE, data["patient"])
	medecin = models.Medecin.objects.get(pk=data["medecin"])

	visite = models.Visite(resultat=data["resultat"], record=record, medecin=medecin)
	visite.save()
	
	return JsonResponse({})

@csrf_exempt
def add_control(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_CONTROL, data["patient"])
	medecin = models.Medecin.objects.get(pk=data["medecin"])

	control = models.Control(resultat=data["resultat"], record=record, medecin=medecin)
	control.save()
	
	return JsonResponse({})


@csrf_exempt
def add_hospitalisation(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_HOSPITALISATION, data["patient"])
	medecin = models.Medecin.objects.get(pk=data["medecin"])

	hospitalisation = models.Hospitalisation(resultat=data["resultat"], duree=, record=record, medecin=medecin)
	hospitalisation.save()
	
	return JsonResponse({})


# def get_all_patient():
# 	patients = models.Patient.objects.all()
# 	res = {}
# 	for p in patients:
# 		res[p.id] = {"nom" : p.nom,  ...:...}

# 	return JsonResponse(res)