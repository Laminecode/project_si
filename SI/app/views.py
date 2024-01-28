from django.shortcuts import render
import json
from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from . import models


from datetime import datetime, timedelta

TYPE_VISITE = "visite"
TYPE_CONTROL = "control"
TYPE_HOSPITALISATION = "hospitalisation"
TYPE_VACCINATION = "vaccination"
TYPE_ANALYSE = "analyse"
TYPE_CHIRURGIE = "chirurgie"


# add views

@csrf_exempt
def add_patient(request):
	data = json.loads(request.body)

	date_naissance = datetime.strptime(data["date_naissance"], "%Y-%m-%d").date()

	patient = models.Patient(nom=data["nom"], prenom=data["prenom"],
							date_naissance=date_naissance, sexe=data["sexe"], information=data["information"])
	patient.save()
	print(data)
	return JsonResponse({})

@csrf_exempt
def add_medecin(request):
	data = json.loads(request.body)

	medecin = models.Medecin(nom=data["nom"], prenom=data["prenom"], specialite=data["specialite"])
	medecin.save()
	
	return JsonResponse({})

def creer_record(type, data):
	record = models.Record(type=type, fait=data["fait"], date=data["date"], patient=models.Patient.objects.get(pk=data["patient"]))
	record.save()
	return record
	# record.patient.set(patient)

def get_medecin_from_ids(list_of_ids: str):
	ids = list_of_ids.split(",")
	res = []
	for _id in ids:
		res.append(models.Medecin.objects.get(pk=int(_id)))
	# print(res)
	return res
#  to do : fix the medecin getting for the rest of the services
@csrf_exempt
def add_visite(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_VISITE, data)
	medecin = get_medecin_from_ids(data["medecin"])
	# medecin = models.Medecin.objects.get(pk=data["medecin"])
	visite = models.Visite(resultat=data["resultat"], record=record)
	visite.save()
	visite.medecin.add(*medecin)
	visite.save()
	
	return JsonResponse({})

@csrf_exempt
def add_control(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_CONTROL, data)
	medecin = get_medecin_from_ids(data["medecin"])

	control = models.Control(resultat=data["resultat"], record=record, )
	control.save()
	control.medecin.add(*medecin)
	control.save()
	return JsonResponse({})

@csrf_exempt
def add_hospitalisation(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_HOSPITALISATION, data)
	medecin = get_medecin_from_ids(data["medecin"])
	duree = timedelta(days=int(data["jour"]))

	hospitalisation = models.Hospitalisation(resultat=data["resultat"], duree=duree, record=record)
	hospitalisation.save()
	
	hospitalisation.medecin.add(*medecin)
	hospitalisation.save()
	
	return JsonResponse({})

@csrf_exempt
def add_analyse(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_ANALYSE, data)
	medecin = get_medecin_from_ids(data["medecin"])

	analyse = models.Analyse(resultat=data["resultat"], type=data["type"], record=record, )
	analyse.save()
	analyse.medecin.add(*medecin)
	analyse.save()
	return JsonResponse({})

@csrf_exempt
def add_chirurgie(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_CHIRURGIE, data)
	medecin = get_medecin_from_ids(data["medecin"])
	duree = timedelta(hours=int(data["heure"]), minutes=int(data["minute"]))

	chirurgie = models.Chirurgie(detail=data["detail"], duree=duree, record=record, )
	chirurgie.save()
	chirurgie.medecin.add(*medecin)
	chirurgie.save()
	return JsonResponse({})

@csrf_exempt
def add_vaccination(request):
	data = json.loads(request.body)
	record = creer_record(TYPE_VACCINATION, data)
	medecin = get_medecin_from_ids(data["medecin"])

	vaccination = models.Vaccination(nom=data["nom"], type=data["type"], record=record, )
	vaccination.save()
	vaccination.medecin.add(*medecin)
	vaccination.save()
	return JsonResponse({})


# get views

def get_all(model):
	objects = model.objects.all()
	res = {}
	for i, obj in enumerate(objects):
		res[i] = obj.dict()
	print(res)
	return JsonResponse(res)

@csrf_exempt
def get_all_patient(request):
	return get_all(models.Patient)

@csrf_exempt
def get_all_medecin(request):
    return get_all(models.Medecin)

@csrf_exempt
def get_all_vaccination(request):
    return get_all(models.Vaccination)

@csrf_exempt
def get_all_hospitalisation(request):
    return get_all(models.Hospitalisation)

@csrf_exempt
def get_all_chirurgie(request):
    return get_all(models.Chirurgie)

@csrf_exempt
def get_all_control(request):
    return get_all(models.Control)

@csrf_exempt
def get_all_visite(request):
    return get_all(models.Visite)

@csrf_exempt
def get_all_analyse(request):
    return get_all(models.Analyse)



def delete(Class, req_data):
	data = json.loads(req_data.body)
	obj = Class.objects.get(pk=data["id"])
	print(obj)
	obj.delete()


@csrf_exempt
def del_patient(data):
	delete(models.Patient, data)
	return JsonResponse({})

@csrf_exempt
def del_medecin(data):
	delete(models.Medecin, data)
	return JsonResponse({})

@csrf_exempt
def del_visite(data):
	delete(models.Visite, data)
	return JsonResponse({})

@csrf_exempt
def del_control(data):
	delete(models.Control, data)
	return JsonResponse({})

@csrf_exempt
def del_hospitalisation(data):
	delete(models.Hospitalisation, data)
	return JsonResponse({})

@csrf_exempt
def del_analyse(data):
	delete(models.Analyse, data)
	return JsonResponse({})

@csrf_exempt
def del_chirurgie(data):
	delete(models.Chirurgie, data)
	return JsonResponse({})

@csrf_exempt
def del_vaccination(data):
	delete(models.Vaccination, data)
	return JsonResponse({})



def get_obj(Class, data):
	return Class.objects.get(pk=int(data["id"]))

@csrf_exempt
def mod_patient(request):
	data = json.loads(request.body)
	patient = get_obj(models.Patient, data)
	nom = data["nom"]
	prenom = data["prenom"]
	date_naissance = data["date_naissance"]
	sexe = data["sexe"]
	information = data["information"]

	if nom:
		patient.nom = nom
	if prenom:
		patient.prenom = prenom
	if sexe:
		patient.sexe = sexe
	if information:
		patient.information = information
	if date_naissance:
		patient.date_naissance = datetime.strptime(date_naissance, "%Y-%m-%d").date()
	
	patient.save()
	return JsonResponse({})

@csrf_exempt
def mod_medecin(request):
	data = json.loads(request.body)
	medecin = get_obj(models.Medecin, data)

	nom = data["nom"]
	prenom = data["prenom"]
	specialite = data["specialite"]

	if nom:
		medecin.nom = nom
	if prenom:
		medecin.prenom = prenom
	if specialite:
		medecin.specialite = specialite

	medecin.save()
	print(data)
	return JsonResponse({})

#  to do : fix the medecin getting for the rest of the services

def mod_and_save_commun_srevice_attr(service, data):
	patient = data["patient"]
	medecin = data["medecin"]
	date = data["date"]
	fait = data["fait"]

	if patient:
		service.record.patient = get_obj(models.Patient, data)
	if medecin:
		medecin = get_medecin_from_ids(data["medecin"])
		service.medecin.set(*medecin)
	if date:
		service.record.date = date
	service.record.fait = fait

	service.record.save()
	service.save()

@csrf_exempt
def mod_visite(request):
	data = json.loads(request.body)
	
	visite = get_obj(models.Visite, data)
	resultat = data["resultat"]

	if resultat:
		visite.resultat = resultat

	mod_and_save_commun_srevice_attr(visite, data)
	
	return JsonResponse({})

@csrf_exempt
def mod_control(request):
	data = json.loads(request.body)
	
	control = get_obj(models.Control, data)
	resultat = data["resultat"]

	if resultat:
		control.resultat = resultat

	mod_and_save_commun_srevice_attr(control, data)
	
	return JsonResponse({})

@csrf_exempt
def mod_hospitalisation(request):
	data = json.loads(request.body)
	
	hospitalisation = get_obj(models.Hospitalisation, data)
	resultat = data["resultat"]
	duree = data["duree"]
	if resultat:
		hospitalisation.resultat = resultat
	if duree:
		hospitalisation.duree = timedelta(days=int(duree))

	mod_and_save_commun_srevice_attr(hospitalisation, data)
	
	return JsonResponse({})

@csrf_exempt
def mod_analyse(request):
	data = json.loads(request.body)
	
	analyse = get_obj(models.Analyse, data)
	resultat = data["resultat"]
	_type = data["type"] 

	if resultat:
		analyse.resultat = resultat
	if _type:
		analyse.type = _type
	mod_and_save_commun_srevice_attr(analyse, data)
	
	return JsonResponse({})

@csrf_exempt
def mod_chirurgie(request):
	data = json.loads(request.body)
	
	chirurgie = get_obj(models.Chirurgie, data)
	heure = data["heure"]
	minute = data["minute"]
	detail = data["detail"]
	if heure and minute:
		chirurgie.duree = timedelta(hours=int(heure), minutes=int(minute))
	if detail:
		chirurgie.detail = detail
	mod_and_save_commun_srevice_attr(chirurgie, data)
	
	return JsonResponse({})

@csrf_exempt
def mod_vaccination(request):
	data = json.loads(request.body)
	
	vaccination = get_obj(models.Vaccination, data)
	nom = data["nom"]
	_type = data["type"]
	
	if nom:
		vaccination.nom = nom
	if _type:
		vaccination.type = _type
		

	mod_and_save_commun_srevice_attr(vaccination, data)
	
	return JsonResponse({})